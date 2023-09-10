import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector } from "../features/auth/authSlice";

const Header = (): ReactElement => {
  const { user } = useSelector(authSelector);

  const renderButton = (): ReactElement | undefined => {
    switch (user) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );

      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={user ? "/surveys" : "/"}
          style={{ cursor: "pointer", paddingLeft: "10px" }}
          className="left brand-logo"
        >
          Emaily
        </Link>
        <ul className="right">{renderButton()}</ul>
      </div>
    </nav>
  );
};

export default Header;
