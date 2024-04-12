import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header__logo">
        반짝
      </Link>
      <div>
        <Link to="/posts/new">Post</Link>
        <Link to="/posts">Discover</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default Header;
