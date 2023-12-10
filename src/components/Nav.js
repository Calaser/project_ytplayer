import { Link } from "react-router-dom";

import VideoPlayerContext from "./context/VideoPlayerContext";
import { useContext } from "react";

const Nav = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <nav>
            <Link to={`${context.root}/settings`}>Settings</Link>
        </nav>
    );
};

export default Nav;