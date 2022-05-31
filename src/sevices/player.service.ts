import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";

const { Player } = switchSelectDatabaseService(currentDatabase);

/**
 * Gets all wallets of a player
 *
 * @param playerId
 * @returns WalletDto[] :: with fields (nickname, balance)
 */
export const getAllWalletsForPlayer = async (
  playerId: string
): Promise<WalletDto[] | null> => {
  return Player.getAllWalletsForPlayer(playerId);
};

export const playerHasWallet = (
  playerId: string,
  walletId: string
): Promise<WalletDto | null> => {
  return Player.playerHasWallet(playerId, walletId)
};
