/* eslint-disable @typescript-eslint/indent */
import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "@src/src/interface/todos";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoDTO } from "@src/src/interface/todos";
import { AxiosError } from "axios";
import { todoService } from "../../api/todos";

export const initialState: TodoState = {
  loading: true,
  todos: [],
};

export const fetchTodosThunk = createAsyncThunk<
  { todos: TodoDTO[] },
  undefined,
  { rejectValue: string }
>("todos/fetch", async (_, { rejectWithValue }) => {
  try {
    return await todoService.fetch();
  } catch (err) {
    const error = err as AxiosError<string>;
    return rejectWithValue(error.message);
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(fetchTodosThunk.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = payload.todos;
    }),
    builder.addCase(fetchTodosThunk.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.error = payload as string;
    }),
  ],
});

export const { resetState } = todoSlice.actions;
export const selectTodos = (state: TodoState) => state;

export default todoSlice.reducer;
