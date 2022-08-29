//Components-待辦清單狀態頁籤
const TodoTab = ({ status, setStatus }) => {
  //變更待辦清單顯示狀態
  const statusHandler = (e) => {
    setStatus(e.target.dataset.status);
  };
  return (
    <ul className="todoList_tab">
      <li>
        <a
          href="#/todo"
          data-status="all"
          className={status === "all" ? "active" : ""}
          onClick={statusHandler}
        >
          全部
        </a>
      </li>
      <li>
        <a
          href="#/todo"
          data-status="uncompleted"
          className={status === "uncompleted" ? "active" : ""}
          onClick={statusHandler}
        >
          待完成
        </a>
      </li>
      <li>
        <a
          href="#/todo"
          data-status="completed"
          className={status === "completed" ? "active" : ""}
          onClick={statusHandler}
        >
          已完成
        </a>
      </li>
    </ul>
  );
};

export default TodoTab;
