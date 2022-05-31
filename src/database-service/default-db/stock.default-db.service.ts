import { InterfaceStockDatabaseService } from "../interface-stock.database-service";
import { StockValue } from "../../models/dto/stock-value.dto";
import { stockNeo4jService } from "../neo4j/stock.neo4j.service";
import { stockMongodbService } from "../mongodb/stock.mongodb.service";

export const stockDefaultDbService: InterfaceStockDatabaseService = {
  createStock(stockValue: StockValue): Promise<StockValue | null> {
    return Promise.race([
      stockNeo4jService.createStock(stockValue),
      stockMongodbService.createStock(stockValue),
      stockMongodbService.createStock(stockValue),
    ]);
  },
  getStock(stockTicker: string): Promise<StockValue | null> {
    return Promise.race([
      stockNeo4jService.getStock(stockTicker),
      stockMongodbService.getStock(stockTicker),
      stockMongodbService.getStock(stockTicker),
    ]);
  },
  updateStock(currentStockValue: StockValue): Promise<StockValue | null> {
    return Promise.race([
      stockNeo4jService.updateStock(currentStockValue),
      stockMongodbService.updateStock(currentStockValue),
      stockMongodbService.updateStock(currentStockValue),
    ]);
  },
};
