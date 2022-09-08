import { useState, useEffect } from "react";
import Todos from "./TodosItem";
import TodoInput from "./TodoInput";
import TodoTab from "./TodoTab";
import {
  useAuth,
  getLocalUser,
  getLocalToken,
  clearLocalUser,
} from "./Context";
import Logout from "./Logout";

const TodoPage = () => {
  const [input, setInput] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //從localStorage取得資料
  console.log(getLocalToken(), getLocalToken());
  const user = getLocalUser();
  const authorization = getLocalToken();

  const LogOut = async () => {
    await Logout();
    await clearLocalUser();
  };

  //API
  //建立API TODO資料
  const addTodoApi = async () => {
    if (input.trim().length == 0) {
      alert("請輸入待辦事項!");
      return;
    } else {
      const _url = "https://todoo.5xcamp.us/todos";
      await fetch(_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization,
        },
        body: JSON.stringify({
          todo: {
            content: input,
          },
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setInput("");
        })
        .catch((err) => console.log(err));
      getTodoApi();
    }
  };

  //取得API TODO資料
  const getTodoApi = () => {
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const list = data.todos.map((item) => ({
          id: item.id,
          content: item.content,
          completed_at: item.completed_at,
        }));
        setTodolist(list);
        console.log(list);
      })
      .catch((err) => console.log(err));
  };

  //變更API TODO完成狀態
  const toggleTodoApi = async (id) => {
    const _url = `https://todoo.5xcamp.us/todos/${id}/toggle`;
    await fetch(_url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: authorization,
      },
    }).then((res) => {
      return res.json();
    });
    getTodoApi();
  };

  //刪除API TODO資料
  const deleteTodoApi = async (id) => {
    const _url = `https://todoo.5xcamp.us/todos/${id}`;
    await fetch(_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization,
      },
    }).then((res) => {
      return res.json();
    });
    getTodoApi();
  };

  useEffect(() => {
    getTodoApi();
  }, []);

  const uncompletedCount = todolist.filter(
    (item) => item.completed_at === null
  ).length;

  useEffect(() => {
    filterHandler();
  }, [todolist, status]);

  //根據完成狀態更新目前清單
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todolist.filter((todo) => todo.completed_at !== null));
        break;
      case "uncompleted":
        setFilteredTodos(todolist.filter((todo) => todo.completed_at === null));
        break;
      default:
        setFilteredTodos(todolist);
        break;
    }
  };

  //清除已完成項目
  const handleDeleteCompleted = async () => {
    let completedList = todolist.filter((data) => data.completed_at);
    for (const data of completedList) {
      await deleteTodoApi(data.id);
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="/ToDoList/#/Todo">
              <span>{user}的待辦</span>
            </a>
          </li>
          <li>
            <a href="/ToDoList" onClick={LogOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <TodoInput
            input={input}
            setInput={setInput}
            addTodoApi={addTodoApi}
          />
          <div className="todoList_list">
            <TodoTab status={status} setStatus={setStatus} />
            <div className="todoList_items">
              <ul className="todoList_item">
                {filteredTodos.map((item) => (
                  <Todos
                    key={item.id}
                    content={item.content}
                    completed_at={item.completed_at}
                    id={item.id}
                    toggleTodoApi={toggleTodoApi}
                    deleteTodoApi={deleteTodoApi}
                  />
                ))}
              </ul>
              <div className="todoList_statistics">
                {todolist.length > 0 ? (
                  <>
                    <p>{uncompletedCount} 個待完成項目</p>
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
