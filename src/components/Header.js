import { Link } from "react-router-dom";

import VideoPlayerContext from "./context/VideoPlayerContext";

import Nav from "./Nav";
import { useContext } from "react";

const Header = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <header className="header">
            <div className="wrapper">
                <Link to={`${context.root}/`}>
                    <h1 className="header-icon">ASMR Player</h1>
                </Link>
                <Nav />
            </div>
        </header>
    );
};

export default Header;