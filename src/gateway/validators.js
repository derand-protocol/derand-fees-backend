import { body, query } from 'express-validator'
import { EVM_NETWORKS } from '../constants.js'
import { ProcessedTx } from '../db/models.js'

export const validateFeeUsageRequest = () => {
  return [
    body('txHash')
      .exists()
      .withMessage('txHash is required')
      .isLength({ min: 66, max: 66 })
      .matches(/^0x.*$/)
      .custom(async (value, { req }) => {
        if(req.body.chainId) {
          const tx = await ProcessedTx.findOne({
            where: {
              chainId: req.body.chainId.toString(),
              txHash: value
            }
          });
          if(tx) {
            throw new Error("Duplicate TX");
          }
        }
      }),
    body('chainId')
      .exists()
      .isNumeric()
      .custom(value => value in EVM_NETWORKS)
      .withMessage("Invalid chainId")
  ]
}

export const validateGetFeeUsage = () => {
  return [
    query('chainId')
      .exists()
      .isNumeric()
      .custom(value => value in EVM_NETWORKS)
      .withMessage("Invalid chainId"),
    query('executor')
      .exists()
      .isLength({ min: 42, max: 42 })
      .matches(/^0x.*$/),
    query('consumer')
      .exists()
      .isLength({ min: 42, max: 42 })
      .matches(/^0x.*$/)
  ]
}

export const validateGetConsumersList = () => {
  return [
    query('page')
      .exists()
      .isInt({min: 1})
      .withMessage("Invalid page")
  ]
}