import Todos from "./Todos";
import { useAuth } from "./Context";
import { useEffect } from "react";

//Components-顯示目前待辦清單
const DisplayTodolist = ({ todolist, setTodolist, filteredTodos }) => {
  const { token } = useAuth();
  const getTodo = () => {
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodolist(res.todos);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <ul className="todoList_item">
      {filteredTodos.map((item) => (
        <Todos
          key={item.id}
          text={item.text}
          done={item.done}
          id={item.id}
          todolist={todolist}
          setTodolist={setTodolist}
        />
      ))}
    </ul>
  );
};

export default DisplayTodolist;
