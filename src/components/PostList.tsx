import { Link, useNavigate } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "src/firebasApp";
import AuthContext from "src/contexts/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}
export interface CommentInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface PostProps {
  id?: string;
  title: string;
  category: CategoryType;
  content: string;
  email: string;
  summary: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  comments?: CommentInterface[];
}

type TabType = "all" | "mypost";

export type CategoryType = "일상" | "개발" | "재미" | "기타";
export const CATEGORIES: CategoryType[] = ["일상", "개발", "재미", "기타"];

const PostList = ({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPost] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    setPost([]);
    const postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "mypost" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else {
      // 카테고리 글
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );
    }

    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPost((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts();
      navigate("/");
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <div className="post__main">
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>

          {/* {CATEGORIES.map((category) => (
            <div
              role="presentation"
              key={category}
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))} */}
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
                  <div className="post__utils-buttons">
                    <div
                      className="post__delete"
                      onClick={() => handleDelete(post.id as string)}
                    >
                      삭제
                    </div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default PostList;
