export interface TodoDTO {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoRES {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoService {
  fetch: () => Promise<{
    todos: TodoDTO[];
  }>;
  fetchDetail: (id: string) => Promise<TodoDTO>;
}

export type TodoState = {
  loading: boolean;
  todos: TodoDTO[];
  error?: string;
};
