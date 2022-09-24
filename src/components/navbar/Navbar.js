import { useState } from "react";
import "./nav.css"
import src from "../../images/Scritta.png"
import searchIcon from "../../images/searchIcon.png"

const Navbar = () => {
  const [navItems] = useState([
    //{ id: 1, label: "Serie A", href: "#" },
    //{ id: 2, label: "Top Club", href: "#" },
    //{ id: 3, label: "Quiz", href: "#" },
    { id: 4, label: "Chi sono", href: "/chi-sono" },
    { id: 5, label: "Contattami", href: "/contact" },
    { id: 6, label: "Offrimi una paglia", href: "/offrici-una-paglia" },
    //{ id: 7, label: "Facci una domanda", href: "#" },
  ]);
  const [collapse, setCollapse] = useState("nav__menu nav__collapse");
  const [toggleIcon, setToggleIcon] = useState("toggler__icon");


  const onToggle = () => {
    collapse === "nav__menu"
      ? setCollapse("nav__menu nav__collapse")
      : setCollapse("nav__menu");

    toggleIcon === "toggler__icon"
      ? setToggleIcon("toggler__icon toggle")
      : setToggleIcon("toggler__icon");
  };

  return (
    <div className="nav__wrapper">
      <div className="container">
        <nav className="nav">    
            <div className={toggleIcon} onClick={onToggle}>
              <div className="line__1"></div>
              <div className="line__2"></div>
              <div className="line__3"></div>
            </div>
            <a href="/" className="nav__brand">
                <img alt="" src={src}></img>
            </a>
            <ul className={collapse}>
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a href={item.href} className="nav__link">
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
            <a href="/search" className="nav__search">
                <img alt="" src={searchIcon}></img>
            </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;


/*
import "./navbar.css"
import src from "../../images/Scritta.png"
export default function Navbar() {
    return(
        <nav className="navbar">
            <a href="/">
                <img alt="" src={src}></img>
            </a>
        </nav>
    )
 
}
*/