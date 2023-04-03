import axiosClient from "@src/src/api-client/axios";
import { TodoDTO, TodoRES, TodoService } from "@src/src/interface/todos";

export const todoService: TodoService = {
  fetch: async () => {
    try {
      const data = await axiosClient.get<TodoRES[]>("/todos");
      console.log(data);
      return {
        todos: data.data.map(
          (todo) =>
            ({
              id: todo.id,
              userId: todo.userId,
              title: todo.title,
              completed: todo.completed,
            } as TodoDTO)
        ),
      };
    } catch (err) {
      console.error(err);
      throw new Error("Đã có lỗi xảy ra khi tải danh sách todos");
    }
  },
  fetchDetail: async (id: string) => {
    try {
      const data = await (await axiosClient.get<TodoRES>(`/todos/${id}`)).data;
      console.log(data);
      return {
        id: data.id,
        userId: data.userId,
        title: data.title,
        completed: data.completed,
      } as TodoDTO;
    } catch (err) {
      console.error(err);
      throw new Error("Đã có lỗi xảy ra khi tải danh sách todos");
    }
  },
};
