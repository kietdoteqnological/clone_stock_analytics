/* eslint-disable @typescript-eslint/indent */
import axiosClient from "@src/src/api-client/axios";
import {
  StockDTO,
  // StockRES,
  StockRES,
  StockService,
  TicketDTO,
  TicketRES,
} from "../interface/stock";

export const stockService: StockService = {
  fetch: async (
    funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY",
    symbol: string,
    apikey = "MR2UPDBWUQ98T87V"
  ) => {
    try {
      const data = (
        await axiosClient.get<StockRES<"week" | "month">>("/query", {
          params: { function: funtion, symbol, apikey },
        })
      ).data;

      const result =
        funtion === "TIME_SERIES_WEEKLY"
          ? Object.entries(data["Weekly Time Series"]).map((obj) => {
              return [
                obj[0],
                +obj[1]["1. open"],
                +obj[1]["2. high"],
                +obj[1]["3. low"],
                +obj[1]["4. close"],
                +obj[1]["5. volume"],
                Number(obj[1]["1. open"]) > Number(obj[1]["4. close"]) ? -1 : 1,
              ];
            })
          : Object.entries(data["Monthly Time Series"]).map((obj) => {
              return [
                obj[0],
                +obj[1]["1. open"],
                +obj[1]["2. high"],
                +obj[1]["3. low"],
                +obj[1]["4. close"],
                +obj[1]["5. volume"],
                Number(obj[1]["1. open"]) > Number(obj[1]["4. close"]) ? -1 : 1,
              ];
            });

      return {
        stocks: {
          "Meta Data": data["Meta Data"],
          Data: result,
        } as StockDTO,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Đã có lỗi xảy ra khi fetch data stock");
    }
  },
  search: async (keywords: string) => {
    try {
      const data = (
        await axiosClient.get<TicketRES>("/query", {
          params: {
            function: "SYMBOL_SEARCH",
            keywords,
            apikey: "MR2UPDBWUQ98T87V",
          },
        })
      ).data;

      return {
        tickets: data as TicketDTO,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Đã có lỗi xảy ra khi fetch data ticket");
    }
  },
};
