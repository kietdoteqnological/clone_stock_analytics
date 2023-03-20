import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../store/todos/slice";
import stockReducer from "@src/src/store/stocks/slice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    stocks: stockReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
