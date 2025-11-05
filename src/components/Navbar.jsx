import { useState } from "react";
import lightLogo from "../assets/techover-logo.png";
import darkLogo from "../assets/techover-logo-dark.png";
import moonIcon from "../assets/moon.svg";
import moonIconBordered from "../assets/moon-bordered.svg"


const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
    setDarkMode(!darkMode);
    };

    const buttonText = darkMode ? "Light Mode" : "Dark Mode";

    return (
        <header className={`Navbar ${darkMode ? "dark" : "light"}`}>
            <div className="title">
                <h2>The Flag App</h2>
            </div>
            <div className="techover-logo">
                <img src={darkMode ? lightLogo : darkLogo} alt="techover-logo" />
            </div>
            <button className="toggle-dark-light-mode" onClick={toggleTheme}><img src={darkMode ? moonIcon : moonIconBordered} alt="" />{buttonText}</button>

        </header>
    )
}

export default Navbar;