import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./Context";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const _url = "https://todoo.5xcamp.us/users";
    console.log({
      user: data,
    });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: data,
      }),
    })
      .then((res) => {
        setToken(res.headers.get("authorization"));
        return res.json();
      })
      .then((res) => {
        navigate("/todo");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formControls_txt">註冊帳號</h2>
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
        <label className="formControls_label" for="name">
          您的暱稱
        </label>
        <input
          className="formControls_input"
          type="text"
          name="name"
          id="name"
          placeholder="請輸入您的暱稱"
          {...register("nickname", {
            required: {
              value: true,
              message: "請輸入資料內容!",
            },
          })}
        />
        <p>{errors.nickname?.message}</p>
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
        <label className="formControls_label" for="pwd">
          再次輸入密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請再次輸入密碼"
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "請輸入資料內容!",
            },
            minLength: {
              value: 6,
              message: "密碼長度至少6位字元",
            },
            validate: (val) => {
              if (watch("password") !== val) {
                return "密碼不一致";
              }
            },
          })}
        />
        <p>{errors.passwordConfirm?.message}</p>
        <input
          className="formControls_btnSubmit"
          type="submit"
          value="註冊帳號"
        />
        <Link to="/login" className="formControls_btnLink">
          登入
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
