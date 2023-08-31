import { ReactElement } from "react";

const Header = (): ReactElement => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="left brand-logo">
          Emaily
        </a>
        <ul className="right">
          <li>
            <a href="">Login with Google</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
