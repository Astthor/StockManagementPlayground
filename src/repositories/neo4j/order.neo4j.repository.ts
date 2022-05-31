import { neo4jConnection } from "../../database-connection/neo4j.database-connection";
import { OrderRequest } from "../../models/order-request";

export const orderNeo4jRepository = {
  createNewStockWalletRelation: async (
    orderRequest: OrderRequest,
    avgPrice: number
  ) => {
    const queryResult = await neo4jConnection(
      `MATCH (stock:Stock {stockTicker: $ticker}) 
                   MATCH (wallet:Wallet {walletId:$walletId}) 
                   MERGE (wallet)-[owns:OWNS {avgPrice: $avgPrice, stockShares: $amount}]->(stock)
                   SET wallet.balance=wallet.balance-($amount*$avgPrice)
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: $avgPrice, 
                                        stockShares: $amount, 
                                        stockTicker: $ticker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   RETURN owns`,
      { ...orderRequest, avgPrice}
    );
    return queryResult.records[0].get(0).properties;
  },
  updateExistStockWalletRelation: async (
    orderRequest: OrderRequest,
    avgPrice: number,
    walletBalance: number
  ) => {
    return (
      await neo4jConnection(
        `MATCH (wallet:Wallet {walletId: $walletId})-[owns:OWNS]->(stock:Stock {stockTicker: $ticker})
                     SET owns.avgPrice= $avgPrice ,
                         owns.stockShares= owns.stockShares + $amount, 
                         wallet.balance=$remainingBalance
                     CREATE (order:Order {type: $orderType, 
                                          date: dateTime(), 
                                          stockPrice: $avgPrice, 
                                          stockShares: $amount, 
                                          stockTicker: $ticker })
                     MERGE (wallet)-[:ORDERED]->(order)
                     RETURN owns`,
        {
          ...orderRequest,
          avgPrice,
          remainingBalance: walletBalance - avgPrice * orderRequest.amount,
        }
      )
    ).records[0].get(0).properties;
  },
  createOrderNode: async (orderRequest: OrderRequest, stockPrice: number) => {
    return (
      await neo4jConnection(
        `MATCH (wallet:Wallet {walletId: $walletId})
                     CREATE (order:Order {type: $orderType, 
                                          date: dateTime(), 
                                          stockPrice: $stockPrice, 
                                          stockShares: $amount, 
                                          stockTicker: $ticker })
                     MERGE (wallet)-[:ORDERED]->(order)
                     RETURN order
    `,
        { ...orderRequest, stockPrice }
      )
    ).records[0].get(0).properties;
  },
  orderSellingStock: async (orderRequest: OrderRequest, avgPrice: number) => {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet {walletId: $walletId})-[owns:OWNS]->(stock:Stock {stockTicker: $ticker})
                   SET wallet.balance=wallet.balance + (owns.stockShares*owns.avgPrice)
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: stock.currentPrice, 
                                        stockShares: $amount, 
                                        stockTicker: stock.stockTicker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   DELETE owns
                   RETURN wallet`,
      {
        ...orderRequest,
        avgPrice,
        orderType: orderRequest.orderType,
      }
    );
    return queryResult.records[0].get(0).properties;
  },
  updateSellingStock: async (orderRequest: OrderRequest, avgPrice: number) => {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet {walletId: $walletId})-[owns:OWNS]->(stock:Stock {stockTicker: $ticker})
                   SET wallet.balance=wallet.balance + (owns.stockShares*owns.avgPrice), 
                       owns.stockShares=owns.stockShares-$amount
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: $avgPrice, 
                                        stockShares: $amount, 
                                        stockTicker: $ticker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   RETURN wallet`,
      { ...orderRequest, avgPrice }
    );
    return queryResult.records[0].get("wallet").properties;
  },
};
