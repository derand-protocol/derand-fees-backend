import { Sequelize, DataTypes, Model } from 'sequelize';
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DB_SERVER + process.env.DB_NAME);

export class ExecutorConsumer extends Model {
  toJson() { 
    return JSON.stringify(this); 
  }
}

export class ProcessedTx extends Model {}

export const initModels = async () => {

  try {
    await sequelize.authenticate();

    ExecutorConsumer.init({
      chainId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      executor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      consumer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      feeUsed: {
        type: DataTypes.STRING,
        defaultValue: "0"
      },
      numberOfTxs: {
        type: DataTypes.BIGINT,
        defaultValue: 0
      }
    }, {
      sequelize,
      modelName: 'ExecutorConsumer',
      indexes: [
        {
          unique: true,
          fields: ['chainId', 'executor', 'consumer']
        }
      ]
    });
  
    ProcessedTx.init({
      chainId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      consumer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      txHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fee: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'ProcessedTx',
      indexes: [
        {
          unique: true,
          fields: ['chainId', 'txHash']
        }
      ]
    });
  
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    await sequelize.sync();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
}