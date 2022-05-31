import { WalletDto } from "../models/dto/wallet.dto";

export interface InterfaceWalletRepository {
  getWallet: (walletId: string) => Promise<WalletDto | null>;
  createWallet: ( playerId: string,walletId: string) => Promise<WalletDto>;
}
