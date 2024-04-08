import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "src/firebasApp";

type Input = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm = () => {
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, input.email, input.password);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // 오작동
  // const validInput = (input: Input) => {
  //const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  //   if (!input?.email?.match(validRegex))
  //     setError("이메일 형식이 올바르지 않습니다.");
  //   if (input?.password?.length < 8)
  //     setError("비밀번호는 8자리 이상으로 입력해주세요");
  //   if (input?.passwordConfirm !== input?.password)
  //     setError("비밀번호와 값이 다릅니다. 다시 확인해주세요.");
  //   if (
  //     input?.passwordConfirm?.length > 0 &&
  //     input?.password !== input?.passwordConfirm
  //   )
  //     setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해주세요.");
  // };

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
      {/* {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )} */}
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
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

export default SignUpForm;
