import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="sidebar">
            <div className="menu_content">
                <ul className="menu_items">
                    <div className="menu_title menu_dashboard"></div>
                    {/* <!-- start --> */}
                    <li className="item">
                        <Link
                            to={"/main/themeListe"}
                            className={`nav_link submenu_item ${currentPath === "/main/themeListe" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bxs-magic-wand"></i>
                            </span>
                            <span className="navlink">Thème</span>
                        </Link>
                        <ul className="menu_items submenu">
                            <Link
                                to={"/main/direction"}
                                className={`nav_link sublink ${currentPath === "/main/direction" ? "nav-active" : ""}`}
                            >
                                <span className="navlink_icon">
                                    <i className="bx bx-medal"></i>
                                </span>
                                Direction
                            </Link>
                            <Link
                                to={"#"}
                                className={`nav_link sublink ${currentPath === "#" ? "nav-active" : ""}`}
                            >
                                Nav Sub Link
                            </Link>
                            <Link
                                to={"#"}
                                className={`nav_link sublink ${currentPath === "#" ? "nav-active" : ""}`}
                            >
                                Nav Sub Link
                            </Link>
                            <Link
                                to={"#"}
                                className={`nav_link sublink ${currentPath === "#" ? "nav-active" : ""}`}
                            >
                                Nav Sub Link
                            </Link>
                        </ul>
                    </li>
                    {/* <!-- end --> */}
                </ul>
                <ul className="menu_items">
                    <li className="item">
                        <Link
                            to={"/main/microdata"}
                            className={`nav_link ${currentPath === "/main/microdata" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-loader-circle"></i>
                            </span>
                            <span className="navlink">Donnée</span>
                        </Link>
                    </li>
                    {/* <!-- End --> */}
                    <li className="item">
                        <Link
                            to={"/main/enquete"}
                            className={`nav_link ${currentPath === "/main/enquete" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-layer"></i>
                            </span>
                            <span className="navlink">Enquetes</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link
                            to={"/main/demandeA"}
                            className={`nav_link ${currentPath === "/main/demandeA" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-filter"></i>
                            </span>
                            <span className="navlink">Demande</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link
                            to={"/main/history"}
                            className={`nav_link ${currentPath === "/main/history" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-layer"></i>
                            </span>
                            <span className="navlink">Historique</span>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_items">
                    <div className="menu_title menu_setting"></div>
                    <li className="item">
                        <Link
                            to={"/main/direction"}
                            className={`nav_link ${currentPath === "/main/direction" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-layer"></i>
                            </span>
                            <span className="navlink">Directions</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link
                            to={"/main/users"}
                            className={`nav_link ${currentPath === "/main/users" ? "nav-active" : ""}`}
                        >
                            <span className="navlink_icon">
                                <i className="bx bx-layer"></i>
                            </span>
                            <span className="navlink">Utilisateurs</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
