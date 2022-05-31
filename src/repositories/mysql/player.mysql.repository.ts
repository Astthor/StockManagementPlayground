import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDto, WalletDtoSelect } from "../../models/dto/wallet.dto";
import { InterfacePlayerRepository } from "../interface-player.repository";
import { stringify } from "uuid";
import { convertUUIDToBin } from "../../utils/uuid-management";

export const PlayerMysqlRepository: InterfacePlayerRepository = {
  async getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    const result = await prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: convertUUIDToBin(playerId),
      },
      select: WalletDtoSelect,
    });
    return result.map((res) => {
      return { ...res, walletId: stringify(res.walletId) };
    });
  },
  async playerHasWallet(playerId: string, walletId: string) {
    const wallet = await prismaMySql.wallet.findUnique({
      where: {
        walletId: convertUUIDToBin(walletId),
      },
      select: {
        fkPlayerId: true,
        nickname: true,
        balance: true,
        walletId: true,
      },
    });
    if (wallet && stringify(wallet.fkPlayerId) === (playerId))
      return { walletId: stringify(wallet.walletId), balance: wallet.balance, nickname: wallet.nickname }
    else
      return null
  }
};
