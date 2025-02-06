import { NavLink } from "react-router-dom";

const Layout = ({children}) => {
    return (
        <div className="layout">
            <nav className="sidebar">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/quick_match" className={({ isActive }) => isActive ? "active" : ""}>
                            Quick Match
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default Layout;