import Carousel from "src/components/Carousel";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import PostList from "src/components/PostList";

const Home = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <PostList />
      <Footer />
    </div>
  );
};

export default Home;
