import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";
import { finnhubApi } from "./api/finnhubConnection";

const { Stock } = switchSelectDatabaseService(currentDatabase);

export const getStock = async (
  stockTicker: string
): Promise<StockValue | null> => {
  try {
    const cacheStockValue = await Stock.getStock(stockTicker);
    const oldestAcceptedUpdateStock = new Date(
      dateInUtc().setMinutes(dateInUtc().getMinutes() - 5)
    );
		console.log("Cached stock value not throwing error");
    if (oldestAcceptedUpdateStock < cacheStockValue?.lastUpdated!) {
      return cacheStockValue;
    }
  } catch (error) {
		console.log("We've got an error in fetching stock: ", error);
    if ((error as Error).message === "Stock ticker not found") {
      const stockFromFinnhub = await finnhubApi.quote(
        stockTicker.toUpperCase()
      );
      //assuming that a stock value cannot be free
      if (stockFromFinnhub.data.c) {
        const createNewStock: StockValue = {
          currentPrice: stockFromFinnhub.data.c,
          description: "",
          lastUpdated: dateInUtc(),
          name: "",
          percentageChange: stockFromFinnhub.data.dp,
          stockTicker: stockTicker,
        };
        await Stock.createStock(createNewStock);
				console.log("We've created the stock it seems: ", createNewStock);
      } else {
				console.log("Stock ticker doesn't exist in through the api: ");
        throw Error("stock Ticker does not exist in the system");
      }
    } else {
      throw error;
    }
  }
  const updateResult = await updateCurrentStockValue(stockTicker);
  if (updateResult) {
		console.log("Got to updated: ", updateResult);
    return getStock(stockTicker);
  }
	console.log("Got to updated outside the if, didn't return: ", updateResult);

  throw new Error("I dont have a name yet");
};

const dateInUtc = () => {
  return new Date(new Date().toUTCString());
};

async function updateCurrentStockValue(stockTicker: string) {
  const currentStockValue = await finnhubApi.quote(stockTicker.toUpperCase());
  const dataToUpdate: StockValue = {
    description: null,
    stockTicker: stockTicker,
    currentPrice: currentStockValue.data.c!,
    percentageChange: currentStockValue.data.dp,
    lastUpdated: dateInUtc(),
  }; // update db
  return Stock.updateStock(dataToUpdate);
}
