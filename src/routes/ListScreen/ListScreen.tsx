import React, { useEffect, useState } from "react";
import {
  getTodoList,
  addTodo,
  removeTodo,
  updateTodo,
} from "../../service/todoAPIService";

type TodoType = { id: string; title: string; subtitle: string };

const ListScreen = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [compliteList, setCompliteList] = useState<TodoType[]>([]);

  const [inputTodo, setInputTodo] = useState("");

  useEffect(() => {
    setTotalTodoList();
  }, []);

  async function setTotalTodoList() {
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
    setCompliteList(complite);
  }

  async function compliteTodo(todo: TodoType) {
    const { id, title, subtitle } = todo;
    const updateId = await updateTodo(id, title, subtitle, true, false);
    return "" + updateId;
  }

  async function rollbackTodo(todo: TodoType) {
    const { id, title, subtitle } = todo;
    const updateId = await updateTodo(id, title, subtitle, false, false);
    return "" + updateId;
  }

  async function handleCheck(id: string) {
    const row = todoList.find((row) => row.id === id);
    if (!row) return;

    const compliteId = await compliteTodo(row);
    if (!compliteId) return;

    handleAppendComplite(row);
    deleteTodo(compliteId);
  }

  async function handleAddTodo(title: string, subtitle?: string) {
    const id = await addTodo(title, subtitle);
    handleAppendTodo({
      id,
      title,
      subtitle: subtitle ?? "",
    });
    setInputTodo("");
  }

  function handleAppendTodo(row: TodoType) {
    setTodoList((prev) => [{ ...row, active: false }, ...prev]);
  }

  function handleAppendComplite(row: TodoType) {
    setCompliteList((prev) => [row, ...prev]);
  }

  async function handleRemoveTodo(id: string) {
    const removeId = await removeTodo(id);
    deleteTodo(removeId);
  }

  function deleteTodo(id: string) {
    setTodoList((prev) => {
      return prev.filter((row) => row.id !== id);
    });
  }

  async function handleRemoveComplite(id: string) {
    const removeId = await removeTodo(id);
    deleteCompliteTodo(removeId);
  }

  function deleteCompliteTodo(id: string) {
    setCompliteList((prev) => {
      return prev.filter((row) => row.id !== id);
    });
  }

  async function handleRollback(id: string) {
    const row = compliteList.find((row) => row.id === id);
    if (!row) return;

    const rollbackId = await rollbackTodo(row);
    if (!rollbackId) return;

    handleAppendTodo(row);
    deleteCompliteTodo(rollbackId);
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
      <div style={{ marginTop: 100 }}>
        <TodoListTitle text="입력" />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <CustomButton
            text={"추가하기"}
            onPress={() => handleAddTodo(inputTodo)}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <TodoListTitle text="해야하는 일" />
          {todoList.map((row) => {
            return (
              <TodoRow
                key={row.id}
                text={row.title}
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
                text={row.title}
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
