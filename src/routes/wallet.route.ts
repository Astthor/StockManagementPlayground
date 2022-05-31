import { Request, Response, Router } from "express";
import { createWallet, getWallet } from "../sevices/wallet.service";
import { walletStockRoutes } from "./wallet-stocks/index.wallet-stock.route";
import { authPlayersWallet } from "../middlewares/authorization/auth.middleware";

export const walletRoutes = Router();

walletRoutes.use("/stock", walletStockRoutes);

/**
 * @swagger
 * /wallet/{walletId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get wallet with walletId
 *    tags: [wallet]
 *    parameters:
 *        - in: path
 *          name: walletId
 *          type: string
 *          required: true
 *          description: id of the wallet
 *    responses:
 *      401:
 *        description: The player failed to login
 *      200:
 *        description: The player is logged in and has wallets associated with their account
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletResponse'
 */
walletRoutes.get(
  "/:walletId",
  authPlayersWallet,
  (req: Request, res: Response) => {
    const walletId: string = req.params.walletId;
    console.log(req.params);
    getWallet(walletId)
      .then((data) => {
        if (data) {
          res.send({ wallet: data });
        } else {
          res.status(404).send({ error: 404, message: "Wallet Not Found" });
        }
      })
      .catch((error: Error) => {
        res.status(400).send({ error: 400, message: "Can not get wallet" });
        console.log("Error: ", error);
      });
  }
);

/**
 * @swagger
 * /wallet/create:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create new wallet for player
 *    tags: [wallet]
 *    responses:
 *      401:
 *        description: The player failed to login
 *      201:
 *        description: new wallet has been generated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletResponse'
 */
walletRoutes.post("/create", async (req, res) => {
  createWallet(req.body.playerId)
    .then((response) => res.send(response))
    .catch((error) => {
      console.error(error);
      res.status(400);
    });
});
