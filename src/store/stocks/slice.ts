/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stockService } from "@src/src/api/stocks";
import { StockDTO, StockState, TicketDTO } from "@src/src/interface/stock";
import { AxiosError } from "axios";

export const fetchStocksThunk = createAsyncThunk<
  { stocks: StockDTO },
  { funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY"; symbol: string },
  { rejectValue: string }
>("stock/fetch", async ({ funtion, symbol }, { rejectWithValue }) => {
  try {
    return await stockService.fetch(funtion, symbol);
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const fetchPayPalStocksThunk = createAsyncThunk<
  { stocks: StockDTO },
  { funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY" },
  { rejectValue: string }
>("stock/paypal", async ({ funtion }, { rejectWithValue }) => {
  try {
    return await stockService.fetch(funtion, "PYPL");
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const fetchNetFlixStocksThunk = createAsyncThunk<
  { stocks: StockDTO },
  { funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY" },
  { rejectValue: string }
>("stock/netflix", async ({ funtion }, { rejectWithValue }) => {
  try {
    return await stockService.fetch(funtion, "NFLX");
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const fetchGoogleStocksThunk = createAsyncThunk<
  { stocks: StockDTO },
  { funtion: "TIME_SERIES_WEEKLY" | "TIME_SERIES_MONTHLY" },
  { rejectValue: string }
>("stock/google", async ({ funtion }, { rejectWithValue }) => {
  try {
    return await stockService.fetch(funtion, "GOOGL");
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const searchTicketThunk = createAsyncThunk<
  { tickets: TicketDTO },
  { keyword: string },
  { rejectValue: string }
>("stock/search", async ({ keyword }, { rejectWithValue }) => {
  try {
    return await stockService.search(keyword);
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const initialState: StockState = {
  loading: true,
  loadingSearch: true,
  ticket: {
    bestMatches: [
      {
        "1. symbol": "",
        "2. name": "",
        "3. type": "",
        "4. region": "",
        "5. marketOpen": "",
        "6. marketClose": "",
        "7. timezone": "",
        "8. currency": "",
        "9. matchScore": "",
      },
    ],
  },
  stocks: {
    "Meta Data": {
      "1. Information": "",
      "2. Symbol": "",
      "3. Last Refreshed": "",
      "4. Time Zone": "",
    },
    Data: [],
  },
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetTicketState: (state) => {
      state.ticket = initialState.ticket;
    },
  },
  extraReducers: (builder) => [
    builder.addCase(fetchStocksThunk.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(fetchStocksThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.stocks = payload.stocks;
    }),
    builder.addCase(fetchStocksThunk.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload! as string;
    }),

    builder.addCase(searchTicketThunk.pending, (state) => {
      state.loadingSearch = true;
    }),
    builder.addCase(searchTicketThunk.fulfilled, (state, { payload }) => {
      state.loadingSearch = false;
      state.ticket = payload.tickets;
    }),
    builder.addCase(searchTicketThunk.rejected, (state, { payload }) => {
      state.loadingSearch = false;
      state.error = payload! as string;
    }),
  ],
});

export const { resetState, resetTicketState } = stockSlice.actions;
export const selectTodos = (state: StockState) => state;

export default stockSlice.reducer;
