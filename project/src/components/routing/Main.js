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

  const Main = () => {
    return(
        <Router>
            <div className="container">
                <div className="menu">
                    <div>
                        <Link to="/">Homepage</Link>
                    </div>
                    <div>
                        <Link to="/about-us">About The Team!</Link>
                    </div>
                    <div>
                        <Link to="/contact-us">Contact Us!</Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <Routes>
                    <Route path = "/about-us" element = {<AboutUs/>}>
                    </Route>
                    <Route path = "/contact-us" element = {<ContactUs/>}>
                    </Route>
                    <Route path = "/" element = {<SearchScreen/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
  }


  export default Main;