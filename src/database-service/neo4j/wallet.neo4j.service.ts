import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { walletNeo4jRepository } from "../../repositories/neo4j/wallet.neo4j.repository";

export const walletNeo4jService: InterfaceWalletDatabaseService = {
  createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    return walletNeo4jRepository.createWallet(playerId, walletId);
  },
  getWallet(walletId: string): Promise<WalletDto | null> {
    return walletNeo4jRepository.getWallet(walletId);
  },
};
