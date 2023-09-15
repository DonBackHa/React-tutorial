import React, { useState } from "react";

const ListScreen = () => {
  const [todoList, setTodoList] = useState<
    { id: string; text: string; active: boolean }[]
  >([
    { id: "0", text: "리스트 1", active: false },
    { id: "1", text: "리스트 리스트 2", active: false },
    { id: "2", text: "리스트 리스트 리스트 3", active: false },
    { id: "3", text: "리스트 리스트 리스트 리스트 4", active: false },
  ]);

  function handleCheck(id: string, active: boolean) {
    setTodoList((prev) => {
      return prev.map((row) => {
        if (row.id === id) {
          return { ...row, active };
        }
        return row;
      });
    });
  }

  function handleRemove(id: string) {
    setTodoList((prev) => {
      return prev.filter((row) => row.id !== id);
    });
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
                active={row.active}
                onCheck={(active) => {
                  handleCheck(row.id, active);
                }}
                onRemove={() => {
                  handleRemove(row.id);
                }}
              />
            );
          })}
        </div>
        <div>
          <TodoListTitle text="완료된 일" />
          {todoList.map((row) => {
            return (
              <CompliteRow
                key={row.id}
                text={row.text}
                onRemove={() => {
                  handleRemove(row.id);
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
  active: boolean;
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

const CompliteRow = (props: { text: string; onRemove?: () => void }) => {
  const { text, onRemove } = props;

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
    </div>
  );
};

export default ListScreen;
