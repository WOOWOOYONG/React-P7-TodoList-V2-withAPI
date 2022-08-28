//Components-待辦事項輸入
const TodoInput = ({ input, setInput, todolist, setTodolist }) => {
  //輸入新待辦事項
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  //新待辦事項加入陣列
  const handleSubmit = () => {
    if (input.trim().length !== 0) {
      const newtodo = {
        text: input,
        done: false,
        id: Math.floor(Math.random() * 1000),
      };
      setTodolist([...todolist, newtodo]);
      setInput("");
    } else {
      alert("請輸入待辦事項!");
      return;
    }
  };
  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="請輸入待辦事項"
        value={input}
        onChange={handleChange}
      />
      <a href="#/todo" onClick={handleSubmit}>
        <i className="fa fa-plus"></i>
      </a>
    </div>
  );
};

export default TodoInput;
