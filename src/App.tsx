import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/posts">Post</Link>
        <Link to="/posts:id">Detail</Link>
      </div>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/posts" element={<h1>Post List</h1>} />
        <Route path="/posts:id" element={<h1>Post Detail</h1>} />
        <Route path="/posts/new" element={<h1>New</h1>} />
        <Route path="/posts/edit:id" element={<h1>New</h1>} />
        <Route path="/profile" element={<h1>New</h1>} />
        <Route path="/*" element={<h1>New</h1>} />
      </Routes>
    </>
  );
}

export default App;
