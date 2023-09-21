import React, { useEffect, useState } from "react";
import { TodoButton, TodoTitle } from "../ListScreen/component";
import { CompliteRow, TodoRow } from "../ListScreen/ListScreen";
import { TodoType } from "../ListScreen/ListScreen.container";
import { BackTodoType } from "../../service/todoAPIService";

const Skeleton = () => {
  const [inCompeleteList, setInCompeleteList] = useState<TodoType[]>([]);
  const [compeleteList, setCompeleteList] = useState<TodoType[]>([]);
  const [inputTodo, setInputTodo] = useState("");

  useEffect(() => {
    getAndSetList();
  }, []);

  async function getAndSetList() {
    // TODO : 데이터를 불러와서 미완료, 완료로 분리 한다.
    const data: BackTodoType[] = [];

    const incomplete: TodoType[] = data
      .filter((todo) => todo.isDel === false && todo.isComplete === false)
      .map((todo) => ({
        id: "" + todo.id,
        title: todo.title,
        subtitle: todo.description,
      }));
    const complete: TodoType[] = data
      .filter((todo) => todo.isDel === false && todo.isComplete === true)
      .map((todo) => ({
        id: "" + todo.id,
        title: todo.title,
        subtitle: todo.description,
      }));

    setInCompeleteList(incomplete);
    setCompeleteList(complete);
  }

  async function handleAddTodo() {
    // TODO : 할 일 추가하기
    setInputTodo("");
    await getAndSetList();
  }

  async function handleCheck(row: TodoType) {
    // TODO : 할 일 미완료 -> 완료로 변경
    await getAndSetList();
  }

  async function handleRollback(row: TodoType) {
    // TODO : 할 일 완료 -> 미완료로 변경
    await getAndSetList();
  }

  async function handleRemove(row: TodoType) {
    // TODO : 할 일 삭제
    await getAndSetList();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: 100 }}>
        <TodoTitle text="입력" />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <TodoButton text={"추가하기"} onPress={handleAddTodo} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <TodoTitle text="해야하는 일" />
          {inCompeleteList.map((row) => {
            return (
              <TodoRow
                key={row.id}
                text={row.title}
                onCheck={() => handleCheck(row)}
                onRemove={() => handleRemove(row)}
              />
            );
          })}
        </div>
        <div style={{ width: 100 }} />
        <div>
          <TodoTitle text="완료된 일" />
          {compeleteList.map((row) => {
            return (
              <CompliteRow
                key={row.id}
                text={row.title}
                onRemove={() => handleRemove(row)}
                onTodo={() => handleRollback(row)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
