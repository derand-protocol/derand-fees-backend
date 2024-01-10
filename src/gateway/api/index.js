import express from 'express';
import Web3 from "web3";
import { validationResult } from 'express-validator';
import { EVM_NETWORKS, FULFILL_LOG_ABI } from '../../constants.js';
import { validateFeeUsageRequest, validateGetFeeUsage } from '../validators.js';
import { ExecutorConsumer, ProcessedTx, sequelize } from '../../db/models.js';
import { bn } from '../../utils.js';
import { convertEthToMuon } from '../../fee.js';

const router = express.Router();

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

      try {

        const decodedLogData = web3.eth.abi.decodeLog(
          FULFILL_LOG_ABI, 
          tx.logs[2].data, 
          tx.logs[2].topics
        );

        await ProcessedTx.create({
          chainId: chainId.toString(),
          txHash: txHash
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

        const txFeeInWei = bn(tx.gasUsed).mul(bn(tx.effectiveGasPrice));

        consumer.feeUsed = bn(consumer.feeUsed).add(
          await convertEthToMuon(chainId, txFeeInWei)
        ).toString();

        console.log(consumer.feeUsed);
        
        await consumer.save({ transaction: dbTransaction });

        data = consumer.toJSON();

        await dbTransaction.commit();

      } catch (error) {
        console.log(error);
        await dbTransaction.rollback();

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
      return next()
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
    
    next()

})

export default router