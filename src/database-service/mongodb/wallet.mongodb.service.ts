import { WalletMongodbRepository } from "../../repositories/mongodb/wallet.mongodb.repository";
import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";

export const walletMongodbService: InterfaceWalletDatabaseService = {
  createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    return WalletMongodbRepository.createWallet( playerId, walletId);
  },
  getWallet: async (walletId: string) => {
    const wallet = await WalletMongodbRepository.getWallet(walletId);
    if (wallet) return wallet;
    else throw Error("wallet not found");
  },
};
