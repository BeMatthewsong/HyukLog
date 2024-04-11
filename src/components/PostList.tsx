import { Link } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebasApp";
import AuthContext from "src/contexts/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostProps {
  id?: string;
  title: string;
  content: string;
  email: string;
  summary: string;
  createdAt: string;
}

type TabType = "all" | "mypost";

const PostList = ({ hasNavigation = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPost] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPost((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("mypost")}
            className={activeTab === "mypost" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post-list">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <SmallProfile
                  authorName={post.email}
                  postDate={post.createdAt}
                />
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {user?.email === post?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
