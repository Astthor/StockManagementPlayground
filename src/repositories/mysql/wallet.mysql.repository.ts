import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDto, WalletDtoSelect } from "../../models/dto/wallet.dto";
import { stringify } from "uuid";
import { convertUUIDToBin } from "../../utils/uuid-management";

export const WalletMysqlRepository: InterfaceWalletRepository = {
  async createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    const result = await prismaMySql.wallet.create({
      data: {
        walletId: convertUUIDToBin(walletId),
        balance: 1000000,
        nickname: walletId,
        created: new Date(),
        fkPlayerId: convertUUIDToBin(playerId)
      },
    });
    return { ...result, walletId: stringify(result.walletId) };
  },
  async getWallet(walletId) {
    const result = await prismaMySql.wallet.findUnique({
      where: {
        walletId: convertUUIDToBin(walletId),
      },
      select: { ...WalletDtoSelect },
    });
    if (result === null) return null;
    return { ...result, walletId: stringify(result.walletId)};
  },
};
