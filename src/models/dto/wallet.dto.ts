import { Prisma } from "../../../prisma/mysql/client";
import { prismaMySql } from "../../database-connection/mysql.database-connection";

export interface WalletStockValue {
  stockTicker: string;
  stockShares: number;
  avgPrice: number;
}

export const walletStockValueSelect =
	Prisma.validator<Prisma.WalletHasStockSelect>()({
    fkStockTicker: true,
    stockShares: true,
    avgPrice: true,
  });

export interface WalletDto {
  walletId: string;
  nickname: string;
  balance: number;
}
/**
 * Using Prisma type safety.
 *  Our interface does not enforce us to return the declared type in the interface even if we are implementing it.
 *
 * Keeping the above WalletDto as our general dto.
 */
export const WalletDtoSelect = Prisma.validator<Prisma.walletSelect>()({
  walletId: true,
  nickname: true,
  balance: true,
});
