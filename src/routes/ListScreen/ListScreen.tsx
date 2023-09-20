import React, { useEffect, useState } from "react";
import {
  getTodoList,
  addTodo,
  removeTodo,
  updateTodo,
} from "../../service/todoAPIService";
import { TodoType } from "./ListScreen.container";

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

  const TodoListTitle = (props: { text: string }) => {
    return (
      <div
        style={{
          fontSize: 32,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {props.text}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: 100 }}>
        <TodoListTitle text="입력" />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <CustomButton
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
          <TodoListTitle text="해야하는 일" />
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
          <TodoListTitle text="완료된 일" />
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

const CustomButton = (props: { text: string; onPress?: () => void }) => {
  const { text, onPress } = props;
  return (
    <div>
      <button onClick={onPress} style={{ fontSize: 16 }}>
        {text}
      </button>
    </div>
  );
};

const CheckBox = (props: {
  active?: boolean;
  onCheck?: (actinve: boolean) => void;
}) => {
  const [active, setActive] = useState(props.active);

  return (
    <input
      type="checkbox"
      checked={active}
      onChange={({ target: { checked } }) => {
        setActive(checked);
        props.onCheck?.(checked);
      }}
      style={{ width: 24, height: 24 }}
    />
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
        <CheckBox active={active} onCheck={onCheck} />
        <div style={{ marginLeft: 16, marginRight: 16, fontSize: 24 }}>
          {text}
        </div>
      </div>
      <CustomButton text={"삭제하기"} onPress={onRemove} />
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
      <CustomButton text={"삭제하기"} onPress={onRemove} />
      <div style={{ width: 8 }} />
      <CustomButton text={"원복"} onPress={onTodo} />
    </div>
  );
};

export default ListScreen;
