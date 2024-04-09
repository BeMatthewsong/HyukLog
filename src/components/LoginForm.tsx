import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "src/firebasApp";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 옳지 않습니다.");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("로그인에 성공했습니다.");
    } catch (e: unknown) {
      toast.error("잘못된 요청입니다.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      {[
        { type: "text", category: "email", value: "이메일" },
        { type: "password", category: "password", value: "비밀번호" },
      ].map((e) => (
        <div className="form__block">
          {/* htmlFor에 input의 아이디나 네임을 적어 인풋과 연결합니다. */}
          <label htmlFor={e.category}>{e.value}</label>
          <input
            type={e.type}
            name={e.category}
            id={e.category}
            onChange={onChange}
            value={e.category === "email" ? email : password}
            required
          />
        </div>
      ))}
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default LoginForm;
