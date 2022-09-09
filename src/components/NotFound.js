import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <h1>404 Not Found</h1>
      <button onClick={() => navigate("/")}>回到首頁</button>
    </div>
  );
};

export default NotFound;
