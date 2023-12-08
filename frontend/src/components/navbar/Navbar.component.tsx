import './Navbar.scss';
import { Link } from 'react-router-dom';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { ThemeContext } from '../../context/theme.context';
import { useContext, useState } from 'react';


const links = [
    { href: "/", lable: "Home" },
    { href: "/companies", lable: "Companies" },
    { href: "/jobs", lable: "Jobs" },
    { href: "/candidates", lable: "Candidates" },
];

const Navbar = () => {

    const [open, setopen] = useState<boolean>(false);

    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const ToggleOpenMenu = () => {
        setopen(prevState => !prevState);
    }

    const menuStyles = open ? "menu open" : "menu"

    return (
        <div className='navbar'>
            <div className="brand">
                <span>Resume Management</span>
            </div>
            <div className={menuStyles}>
                <ul>
                    {links.map(item => (
                        <li key={item.href}>
                            <Link to={item.href} >{item.lable}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hamburger">
                <Menu onClick={ToggleOpenMenu} />
            </div>
            <div className="toggle">
                <ToggleButton value={"check"} selected={darkMode} onChange={toggleDarkMode}>
                    {darkMode ? <LightMode /> : <DarkMode />}
                </ToggleButton>
            </div>
        </div>
    )
}

export default Navbar