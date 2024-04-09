import { Navigate, Route, Routes } from "react-router-dom";
import PostPage from "src/pages/detail";
import Home from "src/pages/home";
import Posts from "src/pages/posts";
import PostEdit from "src/pages/posts/edit";
import PostNew from "src/pages/posts/new";
import ProfilePage from "src/pages/profile";
import SignIn from "src/pages/signin";
import SignUp from "src/pages/signup";

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<SignIn />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
