import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, styled } from '@mui/material';


const Header = styled(AppBar)`
    background: #01579b;
`;
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tabs to="./" exact><b>Security Scan Recorder</b></Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;