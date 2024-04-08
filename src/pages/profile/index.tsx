import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LargeProfile from "../../components/LargeProfile";
import PostList from "../../components/PostList";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <LargeProfile />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};

export default ProfilePage;
