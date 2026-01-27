import React from 'react';
import Header from './Header';
import styles from '../assets/styles/layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Header /> 
      <main className={styles.contentArea}> 
        {children}
      </main>
    </div>
  );
};

export default Layout;