import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context";

const Logout = async () => {
  const { token } = useAuth();
  const { navigate } = useNavigate();
  const _url = "https://todoo.5xcamp.us/sign_out";
  await fetch(_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
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
