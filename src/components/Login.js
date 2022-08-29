import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./Context";
import { useForm } from "react-hook-form";

const Login = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const _url = "https://todoo.5xcamp.us/users/sign_in";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 401) {
          throw new Error("登入失敗，請重新檢驗！");
        }
        setToken(res.headers.get("authorization"));
        return res.json();
      })
      .then((res) => {
        alert(res.message);
        navigate("/todo");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div>
      <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formControls_txt">最實用的線上待辦事項服務</h2>
        <label className="formControls_label" for="email">
          Email
        </label>
        <input
          className="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          {...register("email", {
            required: {
              value: true,
              message: "請輸入資料內容!",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "格式有誤!",
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <label className="formControls_label" for="pwd">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請輸入密碼"
          {...register("password", {
            required: {
              value: true,
              message: "請輸入資料內容!",
            },
            minLength: {
              value: 6,
              message: "密碼長度至少6位字元",
            },
          })}
        />
        <p>{errors.password?.message}</p>
        <input className="formControls_btnSubmit" type="submit" value="登入" />
        <Link to="/signup" className="formControls_btnLink">
          註冊帳號
        </Link>
      </form>
    </div>
  );
};

export default Login;
