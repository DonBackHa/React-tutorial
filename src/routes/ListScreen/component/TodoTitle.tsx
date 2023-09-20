import React from "react";

const TodoTitle = (props: { text: string }) => {
  return (
    <div style={{ fontSize: 32, fontWeight: "700", textAlign: "center" }}>
      {props.text}
    </div>
  );
};
export default TodoTitle;
