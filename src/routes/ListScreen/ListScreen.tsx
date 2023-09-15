import React, { useState } from "react";

type TodoType = { id: string; text: string };

const ListScreen = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([
    { id: "todo0", text: "리스트 1" },
    { id: "todo1", text: "리스트 리스트 2" },
    { id: "todo2", text: "리스트 리스트 리스트 3" },
    { id: "todo3", text: "리스트 리스트 리스트 리스트 4" },
  ]);

  const [compliteList, setCompliteList] = useState<TodoType[]>([
    { id: "complite0", text: "완료 리스트 1" },
    { id: "complite1", text: "완료 리스트 리스트 2" },
    { id: "complite2", text: "완료 리스트 리스트 리스트 3" },
    { id: "complite3", text: "완료 리스트 리스트 리스트 리스트 4" },
  ]);

  function handleCheck(id: string) {
    const row = todoList.find((row) => row.id === id);
    if (!row) return;

    handleRemoveTodo(id);
    handleAppendComplite(row);
  }

  function handleAppendTodo(row: TodoType) {
    setTodoList((prev) => [{ ...row, active: false }, ...prev]);
  }

  function handleAppendComplite(row: TodoType) {
    setCompliteList((prev) => [row, ...prev]);
  }

  function handleRemoveTodo(id: string) {
    setTodoList((prev) => {
      return prev.filter((row) => row.id !== id);
    });
  }

  function handleRemoveComplite(id: string) {
    setCompliteList((prev) => {
      return prev.filter((row) => row.id !== id);
    });
  }

  function handleRollback(id: string) {
    const row = compliteList.find((row) => row.id === id);
    if (!row) return;

    handleRemoveComplite(id);
    handleAppendTodo({ ...row });
  }

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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <TodoListTitle text="해야하는 일" />
          {todoList.map((row) => {
            return (
              <TodoRow
                key={row.id}
                text={row.text}
                onCheck={(active) => {
                  handleCheck(row.id);
                }}
                onRemove={() => {
                  handleRemoveTodo(row.id);
                }}
              />
            );
          })}
        </div>
        <div>
          <TodoListTitle text="완료된 일" />
          {compliteList.map((row) => {
            return (
              <CompliteRow
                key={row.id}
                text={row.text}
                onRemove={() => {
                  handleRemoveComplite(row.id);
                }}
                onTodo={() => {
                  handleRollback(row.id);
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
