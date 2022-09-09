import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context";

const Logout = async () => {
  const { navigate } = useNavigate();
  const { authorization } = JSON.parse(localStorage.getItem("authorization"));

  const _url = "https://todoo.5xcamp.us/sign_out";
  await fetch(_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      navigate("/");
    });
};

export default Logout;
