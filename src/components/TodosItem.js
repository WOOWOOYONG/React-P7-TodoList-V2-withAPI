//Components-待辦事項

const Todos = ({ content, id, completed_at, toggleTodoApi, deleteTodoApi }) => {
  return (
    <li>
      <label className="todoList_label">
        <input
          className="todoList_input"
          type="checkbox"
          checked={completed_at ? true : false}
          onChange={() => {
            toggleTodoApi(id);
          }}
        />
        <span>{content}</span>
      </label>
      <button
        onClick={() => {
          deleteTodoApi(id);
        }}
      >
        <i className="fa fa-times"></i>
      </button>
    </li>
  );
};

export default Todos;
