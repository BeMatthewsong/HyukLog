import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "src/firebasApp";
import { toast } from "react-toastify";

type Input = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm = () => {
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      navigate("/");
      toast.success("회원가입에 성공했습니다.");
    } catch (error) {
      console.log(error);
      toast.error("중복된 이메일이 있습니다.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <form
      action="/post"
      method="POST"
      className="form form--lg"
      onSubmit={onSubmit}
    >
      <h1 className="form__title">회원가입</h1>
      {[
        { type: "text", category: "email", value: "이메일" },
        { type: "password", category: "password", value: "비밀번호" },
        {
          type: "password",
          category: "password_confirm",
          value: "비밀번호 확인",
        },
      ].map((e) => (
        <div className="form__block">
          <label htmlFor={e.category}>{e.value}</label>
          <input
            type={e.type}
            name={e.category}
            id={e.category}
            required
            onChange={onChange}
          />
        </div>
      ))}
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="회원가입" className="form__btn--submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
