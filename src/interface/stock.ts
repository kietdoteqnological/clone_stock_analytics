/* eslint-disable @typescript-eslint/indent */
import { DataItem } from "./chartOption";

export interface StockService {
  fetch: (
    funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY",
    symbol: string
  ) => Promise<{
    stocks: StockDTO;
  }>;
  search: (keyword: string) => Promise<{
    tickets: TicketDTO;
  }>;
}

export interface TicketDTO {
  bestMatches: [
    {
      "1. symbol": string;
      "2. name": string;
      "3. type": string;
      "4. region": string;
      "5. marketOpen": string;
      "6. marketClose": string;
      "7. timezone": string;
      "8. currency": string;
      "9. matchScore": string;
    }
  ];
}

export interface TicketRES {
  bestMatches: [
    {
      "1. symbol": string;
      "2. name": string;
      "3. type": string;
      "4. region": string;
      "5. marketOpen": string;
      "6. marketClose": string;
      "7. timezone": string;
      "8. currency": string;
      "9. matchScore": string;
    }
  ];
}

export interface StockDTO {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
  };
  Data: DataItem[];
}

export interface DataStock {
  [key: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

// export interface StockRES {
//   "Meta Data": {
//     "1. Information": string;
//     "2. Symbol": string;
//     "3. Last Refreshed": string;
//     "4. Time Zone": string;
//   };
//   "Monthly Time Series": DataStock;
//   "Weekly Time Series": DataStock;
// }

export type StockState = {
  loading: boolean;
  stocks: StockDTO;
  error?: string;
  ticket: TicketDTO;
  loadingSearch: boolean;
};

type Key<T extends string> = `${Capitalize<T>}ly Time Series`;

export type StockRES<T extends string> = Record<
  "Meta Data",
  {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
  }
> &
  Record<
    Key<T>,
    {
      [key: string]: {
        "1. open": string;
        "2. high": string;
        "3. low": string;
        "4. close": string;
        "5. volume": string;
      };
    }
  >;
