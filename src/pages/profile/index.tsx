import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LargeProfile from "src/components/LargeProfile";
import PostList from "src/components/PostList";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <LargeProfile />
      <PostList hasNavigation={false} defaultTab={"mypost"} />
      <Footer />
    </>
  );
};

export default ProfilePage;
