import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

function Navbar({ loggedInUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <nav style={navStyle}>
            <span style={logoStyle}>EMS</span>
            {loggedInUser && (
                <div style={userSectionStyle}>
                    <b><span style={usernameStyle}>{loggedInUser}</span><br/></b>
                    <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
                </div>
            )}
        </nav>
    );
}

const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'purple',
    color: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
};

const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
};

const userSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const usernameStyle = {
    fontSize: '18px',
};

const logoutButtonStyle = {
    backgroundColor: 'white',
    color: 'purple',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
};

export default Navbar;
