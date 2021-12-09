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
import "./styles/Main.css";

const Main = () => {
    return (
        <Router>
            <div id="wholebody" className="night">
                <div className="nav-container">
                    <div className="main-header">
                        <Link to="/"><h1>The Karaoke Website</h1></Link>
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
                        <Route path="/" element={<SearchScreen />}>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}


export default Main;