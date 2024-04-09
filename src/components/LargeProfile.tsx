import { getAuth, signOut } from "firebase/auth";
import { app } from "src/firebasApp";
import { toast } from "react-toastify";
import AuthContext from "src/contexts/AuthContext";
import { useContext } from "react";

const LargeProfile = () => {
  const { user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (error: unknown) {
      console.log(error);
      toast.error("잘못된 요청입니다.");
    }
  };

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div
        role="presentation"
        className="profile__logout"
        onClick={handleClick}
      >
        로그아웃
      </div>
    </div>
  );
};

export default LargeProfile;
