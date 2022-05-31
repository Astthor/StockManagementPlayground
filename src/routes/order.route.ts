import { Router } from "express";
import { authPlayersWallet } from "../middlewares/authorization/auth.middleware";
import { placeOrderForWallet } from "../sevices/order.service";

export const orderRoutes = Router();

/**
 * @swagger
 * /order/trade/{walletId}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [order]
 *    parameters:
 *        - in: path
 *          name: walletId
 *          type: string
 *          required: true
 *          description: id of the wallet
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderRequest'
 *    responses:
 *      401:
 *        description: The players is unauthorized
 *      201:
 *        description: order has been completed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderResponse'
 *
 *
 *
 */
orderRoutes.post("/trade/:walletId", authPlayersWallet, (req, res) => {
  const { ticker, amount, orderType } = req.body;
  const walletId = req.params.walletId;
  placeOrderForWallet({
    orderType,
    walletId: walletId,
    ticker: ticker.toUpperCase(),
    amount,
  })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(400).send({ error: 400, message: "Couldn't place order" });
      }
    })
    .catch((error) => {
      console.log("Error in placing order: ", error);
      res.status(400).send({ message: error.message }); // Send internal errors?
    });
});
