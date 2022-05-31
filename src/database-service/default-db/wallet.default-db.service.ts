import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { walletNeo4jService } from "../neo4j/wallet.neo4j.service";
import { walletMongodbService } from "../mongodb/wallet.mongodb.service";
import { walletMysqlService } from "../mysql/wallet.mysql.service";

export const walletDefaultDbService: InterfaceWalletDatabaseService = {
  createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    return Promise.race([
      walletNeo4jService.createWallet(playerId, walletId),
      walletMongodbService.createWallet(playerId, walletId),
      walletMysqlService.createWallet(playerId, walletId),
    ]);
  },
  getWallet(walletId: string): Promise<WalletDto | null> {
    return Promise.race([
      walletNeo4jService.getWallet(walletId),
      walletMongodbService.getWallet(walletId),
      walletMysqlService.getWallet(walletId),
    ]);
  },
};
