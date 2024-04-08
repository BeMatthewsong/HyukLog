import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <form action="/post" method="POST" className="form form--lg">
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
          {/* htmlFor에 input의 아이디나 네임을 적어 인풋과 연결합니다. */}
          <label htmlFor={e.category}>{e.value}</label>
          <input type={e.type} name={e.category} id={e.category} required />
        </div>
      ))}
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
