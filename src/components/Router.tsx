import { Navigate, Route, Routes } from "react-router-dom";
import PostDetail from "../pages/detail";
import PostEdit from "../pages/edit";
import Home from "../pages/home";
import PostNew from "../pages/new";
import Posts from "../pages/posts";
import Profile from "../pages/profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/edit:id" element={<PostEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
