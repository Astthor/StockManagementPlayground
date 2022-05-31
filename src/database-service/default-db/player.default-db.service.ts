import { InterfacePlayerDatabaseService } from "../interface-player.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { playerNeo4jService } from "../neo4j/player.neo4j.service";
import { playerMongodbService } from "../mongodb/player.mongodb.service";
import { playerMysqlService } from "../mysql/player.mysql.service";

export const playerDefaultDbService: InterfacePlayerDatabaseService = {
  getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    return Promise.race([
      playerNeo4jService.getAllWalletsForPlayer(playerId),
      playerMongodbService.getAllWalletsForPlayer(playerId),
      playerMysqlService.getAllWalletsForPlayer(playerId),
    ]);
  },
  playerHasWallet(
    playerId: string,
    walletId: string
  ): Promise<WalletDto | null> {
    return Promise.race([
      playerNeo4jService.playerHasWallet(playerId, walletId),
      playerMongodbService.playerHasWallet(playerId, walletId),
      playerMysqlService.playerHasWallet(playerId, walletId),
    ]);
  },
};
