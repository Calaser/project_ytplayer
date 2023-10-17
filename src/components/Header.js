import { Link } from "react-router-dom";

import Nav from "./Nav";

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper">
                <Link to="/">
                    <h1 className="header-icon">ASMR Player</h1>
                </Link>
                <Nav />
            </div>
        </header>
    );
};

export default Header;