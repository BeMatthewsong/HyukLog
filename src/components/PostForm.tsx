const PostForm = () => {
  // <form> 태그의 action 속성은 폼 데이터(form data)를 서버로 보낼 때 해당 데이터가 도착할 URL을 명시합니다.
  // <form> 태그의 method 속성은 폼 데이터(form data)가 서버로 제출될 때 사용되는 HTTP 메소드를 명시합니다.
  return (
    <form action="/post" method="POST" className="form">
      {[
        { type: "text", category: "title", value: "제목" },
        { type: "text", category: "summary", value: "요약" },
        { type: "textarea", category: "content", value: "내용" },
      ].map((e) => (
        <div className="form__block">
          {/* htmlFor에 input의 아이디나 네임을 적어 인풋과 연결합니다. */}
          <label htmlFor={e.category}>{e.value}</label>
          {e.type === "text" ? (
            <input type={e.type} name={e.category} id={e.category} required />
          ) : (
            <textarea name={e.category} id={e.category} required />
          )}
        </div>
      ))}
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
};

export default PostForm;
