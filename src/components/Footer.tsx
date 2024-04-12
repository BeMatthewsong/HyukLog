import { BsSun } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "src/contexts/ThemeContext";

const Footer = () => {
  const context = useContext(ThemeContext);

  return (
    <footer>
      <div className="footer__text">반짝에 오신 걸 환영합니다</div>
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
