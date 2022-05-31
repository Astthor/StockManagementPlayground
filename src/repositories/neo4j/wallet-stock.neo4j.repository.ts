import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const walletStockNeo4jRepository = {
  getWalletStocks: async (walletId: string, stockTicker: string) => {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet {walletId: $walletId})-[owns:OWNS]->(stock:Stock {stockTicker:$stockTicker}) 
                   RETURN owns, stock`,
      { walletId: +walletId, stockTicker: stockTicker }
    );
    if (queryResult.records.length === 0) return null;
    return {
      stockTicker: queryResult.records[0].get("stock").properties.stockTicker,
      stockShares: queryResult.records[0].get("owns").properties.stockShares,
      avgPrice: queryResult.records[0].get("owns").properties.avgPrice,
    };
  },
};
