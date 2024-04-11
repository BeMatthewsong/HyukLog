import { Link, useParams } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebasApp";
import Loader from "./Loader";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap?.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = () => {
    console.log("삭제");
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
            <div className="post__delete" onClick={handleDelete}>
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
