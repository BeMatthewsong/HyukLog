import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "src/contexts/AuthContext";
import { db } from "src/firebasApp";

// TODO: 디바운스 추가하기
const PostForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // firestore 데이터 생성
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      navigate("/");
      toast.success("게시글을 생성했습니다.");
    } catch (e) {
      console.log(e);
      toast.error("게시글 작성이 실패했습니다.");
    }
  };

  return (
    <form action="/post" method="POST" className="form" onSubmit={onSubmit}>
      {[
        { type: "text", category: "title", value: "제목" },
        { type: "text", category: "summary", value: "요약" },
        { type: "textarea", category: "content", value: "내용" },
      ].map((e) => (
        <div className="form__block">
          {/* htmlFor에 input의 아이디나 네임을 적어 인풋과 연결합니다. */}
          <label htmlFor={e.category}>{e.value}</label>
          {e.type === "text" ? (
            <input
              type={e.type}
              name={e.category}
              id={e.category}
              required
              onChange={onChange}
              value={`${e.category === "title" ? title : summary}`}
            />
          ) : (
            <textarea
              name={e.category}
              id={e.category}
              required
              onChange={onChange}
              value={content}
            />
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
