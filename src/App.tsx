import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let resultTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = resultTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterValuesType, todolistid: string) {
    let todoList = todoLists.find((tl) => tl.id === todolistid);
    if (todoList) {
      todoList.filter = value;
    }
    setTodoLists([...todoLists]);
  }
  const todoListId1 = v1();
  const todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todoListId1, title: "Сегодня", filter: "all" },
    { id: todoListId2, title: "Завтра", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      // { id: v1(), title: "купить что-то", isDone: true },
      // { id: v1(), title: "Попить", isDone: true },
      // { id: v1(), title: "React", isDone: false },
      // { id: v1(), title: "Redux", isDone: false },
    ],
    [todoListId2]: [
      // { id: v1(), title: "spider-man", isDone: false },
      // { id: v1(), title: "Lost", isDone: false },
      // { id: v1(), title: "Big Bang", isDone: false },
    ],
  });

  function removeTodoList(todolistid: string) {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todolistid);
    setTodoLists([...filteredTodoList]);
    delete tasksObj[todolistid];
    setTasks({ ...tasksObj });
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodoLists([todolist, ...todoLists]);
    setTasks({ [todolist.id]: [], ...tasksObj });
  }

  function changeTitleTodoList(newValue: string, todoListId: string) {
    let filteredTodoList = todoLists.find((tl) => tl.id === todoListId);
    if (filteredTodoList) {
      filteredTodoList.title = newValue;
      setTodoLists([...todoLists]);
    }
  }

  return (
    <div className="App">
      <h1 className="todo__title">
        TO<span>DO</span> LIST
      </h1>
      <AddItemForm addItem={addTodolist} />
      <main className="todo_main">
        {todoLists.map((tl) => {
          let tasksForToDoList = tasksObj[tl.id];

          if (tl.filter === "active") {
            tasksForToDoList = tasksForToDoList.filter(
              (t) => t.isDone === false
            );
          }
          if (tl.filter === "completed") {
            tasksForToDoList = tasksForToDoList.filter(
              (t) => t.isDone === true
            );
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForToDoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodoList={removeTodoList}
              changeTaskTitle={changeTaskTitle}
              changeTitleTodoList={changeTitleTodoList}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
