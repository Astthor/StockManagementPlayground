import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";
import { v4 as uuid } from "uuid";

// Assigning the correct repository
const { Wallet } = switchSelectDatabaseService(currentDatabase);

/**
 * Get a single wallet
 *
 * @param walletId
 * @returns WalletDto :: with fields (nickname, balance)
 */
export const getWallet = async (
  walletId: string
): Promise<WalletDto | null> => {
  return Wallet.getWallet(walletId);
};

export const createWallet = async (playerId: string): Promise<WalletDto> => {
  const walletId = uuid();
  return Wallet.createWallet(playerId, walletId);
};
