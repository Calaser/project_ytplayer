import { Link } from "react-router-dom";

import VideoPlayerContext from "./context/VideoPlayerContext";
import { useContext } from "react";

const Nav = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <nav>
            <Link to={`${context.root}/settings`} data-selected={context.location.pathname === `${context.root}/settings`}>{context.translateData["nav"]["setting"][context.currentLanguage]}</Link>
        </nav>
    );
};

export default Nav;