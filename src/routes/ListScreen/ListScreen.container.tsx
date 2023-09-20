import React, { useEffect, useState } from "react";
import {
  getTodoList,
  addTodo,
  removeTodo,
  updateTodo,
} from "../../service/todoAPIService";
import ListScreen from "./ListScreen";

export type TodoType = { id: string; title: string; subtitle: string };
const ListScreenContainer = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [completeTodoList, setCompleteTodoList] = useState<TodoType[]>([]);

  useEffect(() => {
    classificationTodoList();
  }, []);

  /** @description 할일 목록 분류하기 */
  async function classificationTodoList() {
    let todo: TodoType[] = [];
    let complite: TodoType[] = [];

    const list = await getTodoList();
    list.forEach((row) => {
      if (row.isDel) {
        return;
      }

      if (row.isComplete) {
        complite.push({
          id: "" + row.id,
          title: row.title,
          subtitle: row.description,
        });
        return;
      }

      todo.push({
        id: "" + row.id,
        title: row.title,
        subtitle: row.description,
      });
    });

    setTodoList(todo);
    setCompleteTodoList(complite);
  }

  /** @description 완료 처리하기 */
  async function completeTodo(todo: TodoType) {
    const { id, title, subtitle } = todo;
    const updateId = await updateTodo(id, title, subtitle, true, false);
    setCompleteTodoList((prev) => [...prev, todo]);
    setTodoList((prev) => prev.filter((curr) => curr.id !== updateId));
    return updateId;
  }

  /** @description 미완료 처리하기 */
  async function inCompleteTodo(todo: TodoType) {
    const { id, title, subtitle } = todo;
    const updateId = await updateTodo(id, title, subtitle, false, false);
    setTodoList((prev) => [...prev, todo]);
    setCompleteTodoList((prev) => prev.filter((curr) => curr.id !== updateId));
    return updateId;
  }

  /** @description 미완료 할일 제거하기 */
  async function removeInCompleteTodo(todo: TodoType) {
    const removeId = await removeTodo(todo.id);
    setTodoList((prev) => prev.filter((curr) => curr.id != removeId));
    return removeId;
  }

  /** @description 완료 할일 제거하기 */
  async function removeCompleteTodo(todo: TodoType) {
    const removeId = await removeTodo(todo.id);
    setCompleteTodoList((prev) => prev.filter((curr) => curr.id != removeId));
    return removeId;
  }

  /** @description 새로운 할일 추가히기 */
  async function addInCompeleteTodo(title: string, subtitle?: string) {
    const addId = await addTodo(title, subtitle);
    const newTodo: TodoType = { id: addId, title, subtitle: subtitle ?? "" };
    setTodoList((prev) => [newTodo, ...prev]);
    return addId;
  }

  return (
    <ListScreen
      inCompeleteList={todoList}
      compeleteList={completeTodoList}
      onAdd={addInCompeleteTodo}
      onComplete={completeTodo}
      onIncomplete={inCompleteTodo}
      onRemove={(type, todo) => {
        if (type === "complete") {
          removeCompleteTodo(todo);
          return;
        }

        if (type === "incomplete") {
          removeInCompleteTodo(todo);
          return;
        }
      }}
    />
  );
};

export default ListScreenContainer;
