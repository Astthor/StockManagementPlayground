import { InterfaceOrderRepository } from "../interface-order.repository";
import {OrderRequest, OrderType} from "../../models/order-request";
import {prismaMySql} from "../../database-connection/mysql.database-connection";
import { Prisma } from "../../../prisma/mysql/client";
import {  stringify } from "uuid";
import { convertUUIDToBin } from "../../utils/uuid-management";

export const OrderMysqlRepository: InterfaceOrderRepository = {
  async placeOrder(orderRequest: OrderRequest, currentPrice: number) {
    await prismaMySql.$executeRaw(Prisma.sql`CALL safe_order_transaction (
                          ${orderRequest.orderType},
                          ${orderRequest.ticker},
                          ${orderRequest.walletId},
                          ${orderRequest.amount},
                          ${currentPrice});`);

    const latestOrder = await prismaMySql.order.findMany({
      where: {
        fkStockTicker: orderRequest.ticker,
        fkWalletId: convertUUIDToBin(orderRequest.walletId),
      },
      orderBy: {
        orderId: "desc",
      },
      take: 1,
      select: {
        fkWalletId: true,
        fkStockTicker: true,
        stockShares: true,
        type: true,
      },
    });
    if (!latestOrder) {
      return null;
    }
    const orderTypeDB =
      latestOrder[0].type === OrderType.Buy ? OrderType.Buy : OrderType.Sell;
    return {
      orderType: orderTypeDB,
      walletId: stringify(latestOrder[0].fkWalletId!),
      ticker: latestOrder[0].fkStockTicker,
      amount: latestOrder[0].stockShares,
    };
  },
};
