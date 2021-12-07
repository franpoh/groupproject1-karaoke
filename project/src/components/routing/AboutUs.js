import { Switch, Route, Link, useParams } from "react-router-dom";

function AboutUs() {
    const { name } = useParams();
    
    return (
        <div class ="tab-selection">
            <div>
                <Link to="/about-us/Aaron">Aaron</Link>
            </div>
            <div>
                <Link to="/about-us/Francine">Francine</Link>
            </div>
            <div>
                <Link to="/about-us/G1">G1</Link>
            </div>
            <div>
                <Link to="/about-us/Aunt">Aunt</Link>
            </div>
        </div>
    )
}

export default AboutUs;