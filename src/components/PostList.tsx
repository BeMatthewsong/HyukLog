import { Link } from "react-router-dom";
import SmallProfile from "./SmallProfile";

interface PostListProps {
  hasNavigation?: boolean;
}

const PostList = ({ hasNavigation = true }: PostListProps) => {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation--active"></div>
        </div>
      )}
      <div className="post-list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <SmallProfile />
              <div className="post__title">제목</div>
              <div className="post__text">내용</div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
