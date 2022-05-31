import { WalletDto } from "../../models/dto/wallet.dto";
import { WalletMysqlRepository } from "../../repositories/mysql/wallet.mysql.repository";
import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";

export const walletMysqlService: InterfaceWalletDatabaseService = {
  createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    return WalletMysqlRepository.createWallet(playerId, walletId);
  },
  getWallet: async (walletId: string): Promise<WalletDto | null> => {
    return WalletMysqlRepository.getWallet(walletId);
  },
};
