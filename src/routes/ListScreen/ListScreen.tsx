import React, { useState } from "react";
import { TodoType } from "./ListScreen.container";
import { TodoButton, TodoCheckBox, TodoTitle } from "./component";

interface ListScreenProps {
  inCompeleteList: TodoType[];
  compeleteList: TodoType[];
  onAdd?: (title: string, subtitle?: string) => void;
  onRemove?: (type: "incomplete" | "complete", todo: TodoType) => void;
  onComplete?: (todo: TodoType) => void;
  onIncomplete?: (todo: TodoType) => void;
}

const ListScreen = (props: ListScreenProps) => {
  const {
    inCompeleteList,
    compeleteList,
    onAdd,
    onComplete,
    onIncomplete,
    onRemove,
  } = props;
  const [inputTodo, setInputTodo] = useState("");

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
          <TodoButton
            text={"추가하기"}
            onPress={() => {
              onAdd?.(inputTodo);
              setInputTodo("");
            }}
          />
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
                onCheck={(active) => {
                  onComplete?.(row);
                }}
                onRemove={() => {
                  onRemove?.("incomplete", row);
                }}
              />
            );
          })}
        </div>
        <div>
          <TodoTitle text="완료된 일" />
          {compeleteList.map((row) => {
            return (
              <CompliteRow
                key={row.id}
                text={row.title}
                onRemove={() => {
                  onRemove?.("complete", row);
                }}
                onTodo={() => {
                  onIncomplete?.(row);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TodoRow = (props: {
  text: string;
  active?: boolean;
  onCheck?: (active: boolean) => void;
  onRemove?: () => void;
}) => {
  const { text, active, onCheck, onRemove } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 16,
        margin: 8,
        backgroundColor: "#EAEAEA",
        borderRadius: 16,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <TodoCheckBox active={active} onCheck={onCheck} />
        <div style={{ marginLeft: 16, marginRight: 16, fontSize: 24 }}>
          {text}
        </div>
      </div>
      <TodoButton text={"삭제하기"} onPress={onRemove} />
    </div>
  );
};

const CompliteRow = (props: {
  text: string;
  onRemove?: () => void;
  onTodo?: () => void;
}) => {
  const { text, onRemove, onTodo } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 16,
        margin: 8,
        backgroundColor: "#EAEAEA",
        borderRadius: 16,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <div style={{ marginLeft: 16, marginRight: 16, fontSize: 24 }}>
          {text}
        </div>
      </div>
      <TodoButton text={"삭제하기"} onPress={onRemove} />
      <div style={{ width: 8 }} />
      <TodoButton text={"원복"} onPress={onTodo} />
    </div>
  );
};

export default ListScreen;
