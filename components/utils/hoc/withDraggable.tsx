/* eslint-disable react/display-name */
import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";

export const withDraggable = (WrappedComponent) => (props) => {
  const dragRef = useRef<any>(null);
  useEffect(() => {
    if (dragRef.current) {
      Sortable.create(dragRef.current, {
        animation: 220,
        easing: "cubic-bezier(ease)",
      });
    }
  }, []);

  return <WrappedComponent ref={dragRef} {...props} />;
};

// 1
const Input = React.forwardRef(
  ({ name, type, id, disabled, ...props }, ref) => {
    return (
      <input
        {...props}
        name={name}
        id={id}
        disabled={disabled}
        type={type}
        ref={ref}
      />
    );
  }
);

// export default Input;

const Input = withStatusMessages(
  ({ name, type, id, disabled, inputRef, ...props }) => {
    return (
      <input
        {...props}
        name={name}
        id={id}
        disabled={disabled}
        type={type}
        ref={inputRef}
      />
    );
  }
);

export default React.forwardRef((props, ref) => {
  return <Input {...props} inputRef={ref} />;
});
