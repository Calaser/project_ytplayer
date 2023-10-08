import { Link } from "react-router-dom";

import Nav from "./Nav";

const Header = () => {
    return (
        <div className="header">
            <div className="wrapper">
                <Link to="/">
                    <h1 className="header-icon">YT Player</h1>
                </Link>
                <Nav />
            </div>
        </div>
    );
};

export default Header;