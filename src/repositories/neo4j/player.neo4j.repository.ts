import { InterfacePlayerRepository } from "../interface-player.repository";
import { WalletDto } from "../../models/dto/wallet.dto";
import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const playerNeo4jRepository: InterfacePlayerRepository = {
  async getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    const queryResult = await neo4jConnection(
      `MATCH (player:Player {playerId: $playerId})-[:HAS]->(wallet:Wallet) RETURN wallet`,
      { playerId: playerId }
    );
    return queryResult.records.map((res) => res.get(0).properties);
  },
  async playerHasWallet(
    playerId: string,
    walletId: string
  ): Promise<WalletDto | null> {
    const queryResult = await neo4jConnection(
      `MATCH (player:Player {playerId: $playerId})-[:HAS]->(wallet:Wallet {walletId: $walletId}) RETURN wallet`,
      { playerId: playerId, walletId: walletId }
    );
    return queryResult.records[0].get(0).properties;
  },
};
