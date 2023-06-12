import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  filter: string;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => void;
  changeTitleTodoList: (newValue: string, todoListId: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClick = () => props.changeFilter("all", props.id);
  const onActiveClick = () => props.changeFilter("active", props.id);
  const onCompletedClick = () => props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const onChangeTitleTodoList = (newValue: string) => {
    props.changeTitleTodoList(newValue, props.id);
  };

  return (
    <div className="todo__card">
      <div className="todo__card-header">
        <h3 className="todo__card-title">
          <EditableSpan title={props.title} onChange={onChangeTitleTodoList} />
        </h3>
        <button
          className="task__button-delete task__button-delete-header"
          onClick={removeTodoList}
        ></button>
      </div>
      <AddItemForm addItem={addTask} />
      <div>
        <ul className="task__container">
          {props.tasks.map((task) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.id
              );
            };

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id);
            };
            return (
              <li key={task.id} className={task.isDone ? " isDone" : ""}>
                <label className="container">
                  <input
                    className="input__check"
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeHandler}
                  />
                  <div className="checkmark"></div>
                  <EditableSpan
                    title={task.title}
                    onChange={onChangeTitleHandler}
                  />
                  <button
                    className="task__button-delete"
                    onClick={() => {
                      props.removeTask(task.id, props.id);
                    }}
                  ></button>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="button__container">
          <button
            className={
              props.filter === "all"
                ? " button button__active-filter"
                : "button"
            }
            onClick={onAllClick}
          >
            All
          </button>
          <button
            className={
              props.filter === "active"
                ? "button button__active-filter"
                : "button"
            }
            onClick={onActiveClick}
          >
            Active
          </button>
          <button
            className={
              props.filter === "completed"
                ? "button button__active-filter"
                : "button"
            }
            onClick={onCompletedClick}
          >
            Completed
          </button>
        </div>
      </div>
      <p className="todo__description">*double-click to edit the task</p>
    </div>
  );
}
