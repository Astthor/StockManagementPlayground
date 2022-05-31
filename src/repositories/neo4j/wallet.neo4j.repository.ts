import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { WalletDto } from "../../models/dto/wallet.dto";
import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const walletNeo4jRepository: InterfaceWalletRepository = {
  async createWallet( playerId: string,walletId: string): Promise<WalletDto> {
    const result = await neo4jConnection(
      `MATCH (player:Player {playerId: $playerId}) 
                   CREATE (wallet:Wallet {walletId: $walletId, balance:1000000, nickname: $walletId}) 
                   MERGE (player)-[:HAS]->(wallet) RETURN wallet`,
      { playerId: playerId, walletId: walletId }
    );
    return result.records[0].get(0).properties;
  },
  async getWallet(walletId: string): Promise<WalletDto | null> {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet {walletId:$walletId }) RETURN wallet`,
      { walletId: walletId }
    );
    return queryResult.records[0].get(0).properties;
  },
};
