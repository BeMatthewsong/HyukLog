import { Link } from "react-router-dom";

const LargeProfile = () => {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">songww@naver.com</div>
          <div className="profile__name">matthew song</div>
        </div>
        {/* TODO: 로그아웃 기능 추가 */}
      </div>
      <Link to="/" className="profile__logout">
        Logout
      </Link>
    </div>
  );
};

export default LargeProfile;
