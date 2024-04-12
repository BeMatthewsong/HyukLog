import { Link, useNavigate, useParams } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "src/firebasApp";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Comments from "./Comments";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap?.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post?.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <div className="post__detail">
      {post ? (
        <>
          <div className="post__title">{post?.title}</div>
          <SmallProfile authorName={post?.email} postDate={post?.createdAt} />
          <div className="post__utils-box">
            {post?.category && (
              <div className="post__category">{post?.category}</div>
            )}
            <div className="post__utils-buttons">
              <div className="post__delete" onClick={handleDelete}>
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
          <Comments post={post} getPost={getPost} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
