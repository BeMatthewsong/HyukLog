import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";

const Posts = () => {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};

export default Posts;
