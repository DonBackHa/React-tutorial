import React, { useState } from "react";

const TodoCheckBox = (props: {
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

export default TodoCheckBox;
