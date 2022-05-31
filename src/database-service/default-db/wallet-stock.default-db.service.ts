import { InterfaceWalletStockDatabaseService } from "../interface-wallet-stock.database-service";
import { WalletStockValue } from "../../models/dto/wallet.dto";
import { walletStockNeo4jService } from "../neo4j/wallet-stock.neo4j.service";
import { walletStockMysqlService } from "../mysql/wallet-stock.mysql.service";
import { walletStockMongodbService } from "../mongodb/wallet-stock.mongodb.service";

export const walletStockDefaultDbService: InterfaceWalletStockDatabaseService =
  {
    getWalletStocks(walletId: string): Promise<WalletStockValue[] | null> {
      return Promise.race([
        walletStockNeo4jService.getWalletStocks(walletId),
        walletStockMysqlService.getWalletStocks(walletId),
        walletStockMongodbService.getWalletStocks(walletId),
      ]);
    },
    getWalletStocksWithStockTicker(
      walletId: string,
      stockTicker: string
    ): Promise<WalletStockValue | null> {
      return Promise.race([
        walletStockNeo4jService.getWalletStocksWithStockTicker(
          walletId,
          stockTicker
        ),
        walletStockMysqlService.getWalletStocksWithStockTicker(
          walletId,
          stockTicker
        ),
        walletStockMongodbService.getWalletStocksWithStockTicker(
          walletId,
          stockTicker
        ),
      ]);
    },
  };
