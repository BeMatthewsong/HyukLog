import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "src/contexts/AuthContext";
import { db } from "src/firebasApp";
import { CommentInterface, PostProps } from "./PostList";

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => void;
}

const Comments = ({ post, getPost }: CommentsProps) => {
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        }
      }
      toast.success("댓글을 생성했습니다.");
      setComment("");
      getPost(post?.id as string);
    } catch (error: unknown) {
      console.error(error);
      toast.error("댓글을 실패했습니다.");
    }
  };

  const handleDeleteComment = async (data: CommentInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하겠습니까?");
    if (confirm && post.id) {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });
      toast.success("댓글이 삭제되었습니다.");
      getPost(post.id);
    }
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comments">댓글입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {post?.comments
          ?.slice()
          .reverse()
          .map((comment) => (
            <div key={comment.createdAt} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment.email}</div>
                <div className="comment__date">{comment.createdAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
