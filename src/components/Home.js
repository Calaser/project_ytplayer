import { Link } from "react-router-dom";

// import VideoPlayerContext from "./context/VideoPlayerContext";
// import { useContext } from "react";

const Home = () => {
    // const context = useContext(VideoPlayerContext);

    return (
        <main className="wrapper">
            <h1>Recommend Video</h1>
            <Link to="/video/LZh4ioW31J8">Vito ASMR 1</Link>
            <br/>
            <Link to="/video/Gq5bVmgxx30">Vito ASMR 2</Link>
            <br/>
            <Link to="/video/cjS5btICT8Y">Vito ASMR 3</Link>
        </main>
    );
};

export default Home;