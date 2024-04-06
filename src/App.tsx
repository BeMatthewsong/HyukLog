import { Link } from "react-router-dom";
import "./App.css";
import Router from "./components/Router";

function App() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/posts">Post</Link>
        <Link to="/posts:id">Detail</Link>
      </div>
      <Router />
    </>
  );
}

export default App;
