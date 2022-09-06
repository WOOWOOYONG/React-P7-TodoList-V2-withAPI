//Components-待辦事項輸入
const TodoInput = ({ input, setInput, addTodoApi }) => {
  //輸入新待辦事項
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="請輸入待辦事項"
        value={input}
        onChange={handleChange}
      />
      <a href="#/todo" onClick={addTodoApi}>
        <i className="fa fa-plus"></i>
      </a>
    </div>
  );
};

export default TodoInput;
