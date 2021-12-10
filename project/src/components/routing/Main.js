import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import SearchScreen from "../SearchScreen";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import config from "../../config/index.js"
import "./styles/Main.css";

// G1: line 17 added webpage class as otherwise header styling jumps when click on darkmode
const Main = () => {
    return (
        <Router>
            <div id="wholebody" className="webpage night">
                <div className="nav-container">
                    <div className="main-header">
                        <Link to="/groupproject1-karaoke"><h1>The Karaoke Website</h1></Link>
                    </div>
                    <div className="menu">
                        <div className="menu-items">
                            <Link to="/about-us"><h2>About Us</h2></Link>
                        </div>
                        <div className="menu-items">
                            <Link to="/contact-us"><h2>Contact Us</h2></Link>
                        </div>
                    </div>
                </div>
                {/* <div className="content"> */}
                <div>
                    <Routes>
                        <Route path="/about-us" element={<AboutUs />}>
                        </Route>
                        <Route path="/contact-us" element={<ContactUs />}>
                        </Route>
                        <Route exact path="/groupproject1-karaoke" element={<SearchScreen />}>
                        </Route>
                    </Routes>
                </div>
                <p className="config">{config.baseURL}</p>
            </div>
        </Router>
    );
}


export default Main;