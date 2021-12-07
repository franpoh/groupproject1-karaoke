import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import SearchScreen from "../SearchScreen";
import AboutUs from "./AboutUs";

const Main = () => {
    return(
        <Router>
            <div className="router-container">
                <div className = "router-menu">
                    <h1>
                        <Link to="/">The Karaoke Website</Link>
                    </h1>
                    <div>
                        <AboutUs/>
                    </div>
                </div>
                <div className = "content">
                    <Routes>
                        <Route path ="/">
                            <SearchScreen/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default Main;