import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for navigation
import User from './User'; // Import the User component

function Header({ headerText }) {
  return (
    <header style={styles.header}>
      {/* Header Text */}
      <div style={styles.headerText}>{headerText}</div>
      
      {/* Icons (About and User) */}
      <div style={styles.icons}>
        {/* About Icon */}
        {/* <Link to="/about">
          <img 
            src="info.png" 
            alt="About" 
            style={styles.icon} 
          />
        </Link> */}

        {/* User Icon */}
         {/* <User /> User component is included on the right */}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#242424',
    color: 'white',
    borderBottom: '1px solid #888',  // ← add this line
  },
  headerText: {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1, // This makes the text take up available space
    justifyContent: 'center', // Centers the text horizontally
    display: 'flex', // Needed for justifyContent to work
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns icons to the right
  },
  icon: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    marginLeft: '10px' // add a margin to the left of the icon
  },
};
export default Header;
