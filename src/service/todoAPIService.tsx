import axios from "axios";
import { TodoType } from "../routes/ListScreen/ListScreen.container";

export type BackTodoType = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isDel: boolean;
};

/** @description Todo 리스트 불러옴 */
export async function getTodoList() {
  const { data } = await axios.get<{ data: BackTodoType[] }>("/api/todos");
  return data.data;
}

/** @description Todo 추가 */
export async function addTodo(title: string, description?: string) {
  const newTodo: Pick<BackTodoType, "title" | "description"> = {
    title,
    description: description ?? "",
  };
  const { data: id } = await axios.post<number>("/api/todos", newTodo);
  return "" + id;
}

/** @description Todo 삭제*/
export async function removeTodo(todoId: string) {
  const { data: id } = await axios.delete<number>(`/api/todos/${todoId}`);
  return "" + id;
}

/** @description Todo 변경한다 */
export async function updateTodo(todo: TodoType, isComplete: boolean) {
  const newTodo: Omit<BackTodoType, "id"> = {
    title: todo.title,
    description: todo.subtitle,
    isComplete: isComplete,
    isDel: false,
  };
  const { data: id } = await axios.put<number>(
    `/api/todos/${todo.id}`,
    newTodo
  );
  return "" + id;
}
