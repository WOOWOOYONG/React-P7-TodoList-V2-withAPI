//Components-待辦事項
const Todos = ({ text, id, done, todolist, setTodolist }) => {
  //刪除待辦事項
  const handleDelete = (deleteid) => {
    setTodolist(
      todolist.filter((todo) => {
        return todo.id !== deleteid;
      })
    );
  };
  //計算已完成項目
  const handleCheck = (id) => {
    const newTodolist = [...todolist];
    newTodolist.forEach((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });
    setTodolist(newTodolist);
  };
  return (
    <li>
      <label className="todoList_label">
        <input
          className="todoList_input"
          type="checkbox"
          checked={done}
          onChange={() => {
            handleCheck(id);
          }}
        />
        <span>{text}</span>
      </label>
      <a
        href="#"
        onClick={() => {
          handleDelete(id);
        }}
      >
        <i className="fa fa-times"></i>
      </a>
    </li>
  );
};

export default Todos;
