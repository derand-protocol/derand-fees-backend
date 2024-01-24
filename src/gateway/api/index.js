import express from 'express';
import Web3 from "web3";
import { validationResult } from 'express-validator';
import { EVM_NETWORKS, FULFILL_LOG_ABI } from '../../constants.js';
import { 
  validateFeeUsageRequest, 
  validateGetConsumersList, 
  validateGetFeeUsage 
} from '../validators.js';
import { ExecutorConsumer, ProcessedTx, sequelize } from '../../db/models.js';
import { ONE_BN, bn } from '../../utils.js';
import { convertWeiToMuon } from '../../fee.js';
import { createClient } from 'redis';
import redisLock from 'redis-lock';
import { getConsumerBalances } from '../../subgraph.js';

const router = express.Router();
const redisClient = createClient();
const lock = redisLock(redisClient);
await redisClient.connect();

router.post('/record-fee-usage', 
  validateFeeUsageRequest(),
  async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        success: false,
        message: "Invalid request",
        data: errors.array()
      });
      return next();
    }

    const { txHash, chainId } = req.body;
    const network = EVM_NETWORKS[chainId];

    const web3 = new Web3(network.rpc_url);
    let tx;
    try {
      tx = await web3.eth.getTransactionReceipt(txHash);
    } catch (error) {
      console.log(error.message);
    }

    if(tx && 
      tx.logs[2]?.address.toLowerCase() == network.coordinator_address.toLowerCase()
    ) {
      const dbTransaction = await sequelize.transaction();

      let success = true;
      let data = "";
      let done;

      try {

        const decodedLogData = web3.eth.abi.decodeLog(
          FULFILL_LOG_ABI, 
          tx.logs[2].data, 
          tx.logs[2].topics
        );

        done = await lock(`${chainId}-${decodedLogData.consumer.toLowerCase()}`);

        const txFeeInWei = bn(tx.gasUsed).mul(
          bn(tx.effectiveGasPrice)
        );

        const txFeeInPion = await convertWeiToMuon(chainId, txFeeInWei);

        await ProcessedTx.create({
          chainId: chainId.toString(),
          consumer: decodedLogData.consumer.toLowerCase(),
          txHash: txHash,
          fee: txFeeInPion.toString()
        }, { transaction: dbTransaction });

        let consumer = await ExecutorConsumer.findOne({
          where: {
            chainId: chainId.toString(),
            executor: decodedLogData.executor.toLowerCase(),
            consumer: decodedLogData.consumer.toLowerCase()
          },
          lock: true
        });
  
        if(!consumer) {
          consumer = ExecutorConsumer.build({
            chainId: chainId.toString(),
            executor: decodedLogData.executor.toLowerCase(),
            consumer: decodedLogData.consumer.toLowerCase(),
          }, { transaction: dbTransaction })
        }

        consumer.feeUsed = bn(consumer.feeUsed).add(txFeeInPion).toString();
        consumer.numberOfTxs = bn(consumer.numberOfTxs).add(ONE_BN);
        await consumer.save({ transaction: dbTransaction });

        console.log("Fee:", txFeeInPion.toString());
        console.log("totalFeeUsed:", consumer.feeUsed);

        data = consumer.toJSON();

        await dbTransaction.commit();
        await done();

      } catch (error) {
        console.log(error);
        await dbTransaction.rollback();

        if(done) {
          await done();
        }

        success = false;
        data = "An error occurred during proccessing the transaction";
      }

      res.json({
        success: success,
        data: data
      });
      
    } else {
      res.json({
        success: false,
        data: "Invalid tx"
      });
    }
    
    next();

})

router.get('/consumer-fee-usage', 
  validateGetFeeUsage(),
  async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.json({
        success: false,
        message: "Invalid request",
        data: errors.array()
      })
      return next();
    }
    
    const {chainId, executor, consumer} = req.query;

    try {
      let executorConsumer = await ExecutorConsumer.findOne({
        where: {
          chainId: chainId.toString(),
          executor: executor.toLowerCase(),
          consumer: consumer.toLowerCase()
        }
      });

      if(executorConsumer) {
        res.json({
          success: true,
          data: executorConsumer.toJSON()
        });
      } else {
        res.json({
          success: true,
          data: {
            feeUsed: "0"
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        data: {}
      });
    }
    
    next();

})

router.get('/consumers-list', validateGetConsumersList(),
 async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.json({
      success: false,
      message: "Invalid request",
      data: errors.array()
    })
    return next();
  }

  try {
    const { page } = req.query;
    const consumerBalances = await getConsumerBalances(100, (page - 1) * 100);
    await Promise.all(consumerBalances.map(async (item) => {
      item['feeBalance'] = item['amount'];
      delete item['amount'];
      let executorConsumer = await ExecutorConsumer.findOne({
        where: {
          chainId: item['chainId'],
          executor: item['executor'].toLowerCase(),
          consumer: item['consumer'].toLowerCase()
        }
      });
      let feeUsed = 0;
      let numberOfTxs = 0;
      if(executorConsumer) {
        feeUsed = executorConsumer.feeUsed;
        numberOfTxs = executorConsumer.numberOfTxs;
      }
      item['feeUsed'] = feeUsed;
      item['numberOfTxs'] = numberOfTxs;
      item['balance'] = bn(item['feeBalance']).sub(bn(item['feeUsed'])).toString();
    }));
    res.json({
      success: true,
      data: consumerBalances
    });
  } catch (error) {
    res.json({
      success: false,
      data: error.message
    }); 
  }

  next();
});

export default router