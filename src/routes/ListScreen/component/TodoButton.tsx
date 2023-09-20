import React from "react";

const TodoButton = (props: { text: string; onPress?: () => void }) => {
  const { text, onPress } = props;
  return (
    <div>
      <button onClick={onPress} style={{ fontSize: 16 }}>
        {text}
      </button>
    </div>
  );
};

export default TodoButton;
