interface SmallProfileProps {
  authorName: string;
  postDate: string;
}

const SmallProfile = ({ authorName, postDate }: SmallProfileProps) => {
  return (
    <div className="post__profile-box">
      <div className="post__profile"></div>
      <div className="post__author-name">{authorName}</div>
      <div className="post__date">{postDate}</div>
    </div>
  );
};

export default SmallProfile;
