import SmallProfile from "./SmallProfile";

const PostDetail = () => {
  return (
    <div className="post__detail">
      <div className="post__title">제목</div>
      <SmallProfile />
      <div className="post__utils-box">
        <div className="post__delete">삭제</div>
        <div className="post__edit">수정</div>
      </div>
      <div className="post__text">내용입니다.</div>
    </div>
  );
};

export default PostDetail;
