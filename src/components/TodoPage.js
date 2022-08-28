import { useState, useEffect } from "react";

import TodoInput from "./TodoInput";
import TodoTab from "./TodoTab";
import DisplayTodolist from "./DisplayTodolist";
import { useAuth } from "./Context";

const TodoPage = () => {
  const { token } = useAuth();
  const [input, setInput] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler();
  }, [todolist, status]);

  //根據完成狀態更新目前清單
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todolist.filter((todo) => todo.done === true));
        break;
      case "uncompleted":
        setFilteredTodos(todolist.filter((todo) => todo.done === false));
        break;
      default:
        setFilteredTodos(todolist);
        break;
    }
  };

  //清除已完成項目
  const handleDeleteCompleted = () => {
    setTodolist(
      todolist.filter((todo) => {
        return todo.done == false;
      })
    );
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <TodoInput
            input={input}
            setInput={setInput}
            todolist={todolist}
            setTodolist={setTodolist}
          />
          <div className="todoList_list">
            <TodoTab status={status} setStatus={setStatus} />
            <div className="todoList_items">
              <DisplayTodolist
                todolist={todolist}
                setTodolist={setTodolist}
                filteredTodos={filteredTodos}
              />
              <div className="todoList_statistics">
                {todolist.length > 0 ? (
                  <>
                    <p>
                      {todolist.filter((item) => item.done === false).length}{" "}
                      個待完成項目
                    </p>
                    <a href="#/todo" onClick={handleDeleteCompleted}>
                      清除已完成項目
                    </a>
                  </>
                ) : (
                  <div className="todoEmpty">
                    <p>目前尚無待辦事項</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
