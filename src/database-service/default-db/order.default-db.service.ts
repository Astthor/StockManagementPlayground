import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { OrderRequest } from "../../models/order-request";
import { OrderDetail } from "../../models/dto/order-detail.dto";
import { orderMysqlService } from "../mysql/order.mysql.service";
import { orderNeo4jService } from "../neo4j/order.neo4j.service";
import { orderMongodbService } from "../mongodb/order.mongodb.service";

export const orderDefaultDbService: InterfaceOrderDatabaseService = {
  createOrder(
    orderRequest: OrderRequest,
    currentPrice: number
  ): Promise<OrderDetail | null> {
    return Promise.race([
      orderMysqlService.createOrder(orderRequest, currentPrice),
      orderNeo4jService.createOrder(orderRequest, currentPrice),
      orderMongodbService.createOrder(orderRequest, currentPrice),
    ]);
  },
};
