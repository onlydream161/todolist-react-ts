import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string>("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required!");
    }
  };

  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.key === "Enter") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="add__group">
      <div className="input-group">
        <input
          placeholder="Add Tasks"
          maxLength={30}
          type="text"
          name="text"
          autoComplete="off"
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={OnKeyPressHandler}
          className={error ? " input error" : " input"}
        />
        <label className="user-label">Add Tasks</label>
        <button className="button__add" onClick={addTask}></button>
      </div>

      {error && <div className="error-massage">{error} </div>}
    </div>
  );
}
