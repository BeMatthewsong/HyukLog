import { Link } from "react-router-dom";
import { BsSun } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "src/contexts/ThemeContext";

const Footer = () => {
  const context = useContext(ThemeContext);

  return (
    <footer>
      <div>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
      <div>
        {context.theme === "light" ? (
          <BsSun onClick={context.toggleMode} className="footer__theme-btn" />
        ) : (
          <BsMoonFill
            onClick={context.toggleMode}
            className="footer__theme-btn"
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
