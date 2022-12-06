import { TextareaAutosize } from "@mui/material";
import { useEffect, useRef } from "react";

function TextareaCmp({ id, data, onChangeTextArea, autoSelect }) {
  const inputRef = useRef(null);

  const onChangeVal = (event) => {
    onChangeTextArea(id, event.target.value);
  };

  useEffect(() => {
    if (autoSelect) inputRef && inputRef.current?.focus();
  }, [autoSelect]);

  return (
    <>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Enter a value"
        style={{ width: 600 }}
        minRows={4}
        onChange={onChangeVal}
        ref={inputRef}
        value={data ? data : ""}
      />
    </>
  );
}

export default TextareaCmp;
