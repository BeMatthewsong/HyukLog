import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "src/contexts/AuthContext";
import { db } from "src/firebasApp";
import { PostProps } from "./PostList";

// TODO: 디바운스 추가하기
const PostForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState<PostProps | null>(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

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
      if (post && post.id) {
        // firebase로 데이터 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          // TODO: 며칠 전 추가 (day.js)
          updateDoc: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          uid: user?.uid,
        });
        toast.success("게시글 수정이 성공했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        // firebase로 데이터 추가
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
        });

        navigate("/");
        toast.success("게시글을 생성했습니다.");
      }
    } catch (e) {
      console.log(e);
      toast.error("게시글 작성이 실패했습니다.");
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap?.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

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
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
};

export default PostForm;
