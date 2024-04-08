import Footer from "src/components/Footer";
import Header from "src/components/Header";
import PostList from "src/components/PostList";

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
