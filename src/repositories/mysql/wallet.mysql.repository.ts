import { WalletObjectMapping } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { StockValue } from "../../models/dto/wallet.dto";

export const walletObjectMappingMySQL: WalletObjectMapping = {
  async getWalletStocks(walletId) {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: walletId,
      },
    });
    return queryResult.map((result) => {
      const stockValue: StockValue = {
        stockTicker: result.fkStockTicker,
        stockShares: result.stockShares,
        avgPrice: result.avgPrice,
      };
      return stockValue;
    });
  },
  async getWallet(walletId) {
    const queryResult = await prismaMySql.wallet.findUnique({
      where: {
        walletId: walletId,
      },
    });
    return queryResult ? queryResult : new Error("wallet not found");
  },
  async getAllWalletsForPlayer(playerId) {
    return await prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: playerId,
      },
    });
  },
};
