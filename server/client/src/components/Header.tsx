import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector } from "../features/auth/authSlice";
import Payments from "./Payments";

const Header = (): ReactElement => {
  const { user } = useSelector(authSelector);

  const renderContent = (): ReactElement | undefined => {
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
          <>
            <li>
              <Payments />
            </li>
            <li style={{ padding: "0 10px" }}>Credits: {user.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
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
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
