import React, { useState } from 'react';
import styles from '../../styles/common/navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
    const [responsiveClass, setResponsive] = useState("inactive");
    function toggleBurger() {
        // console.log("Burger clicked");
        if (responsiveClass === "inactive") {
            setResponsive('is-responsive');
        } else {
            setResponsive('inactive');
        }
    }

    const logoSize = "50px";

    return (
        <nav className={`${styles.navbar} ${styles[responsiveClass]}`} id="navbar">
            <a className={styles["main-link"]} href="/">
                <Image src="/static/img/logo-small.png" width={logoSize} height={logoSize} />
                <span>Dulan Does Dishes</span>
            </a>

            <a className={styles["nav-link"]} href="/about"><span>About</span></a>
            <a className={styles["nav-link"]} href="/recipes"><span>Recipes</span></a>
            <a className={styles["nav-link"]} href="https://vu-dylan.github.io/" target="_blank" rel="noopener noreferrer"><span>"Cooking's like coding!"</span></a>

            <div className={`${styles.hamburger} ${styles[responsiveClass]}`} id="hamburger" onClick={() => toggleBurger()}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </nav>
    )

}

export default Navbar;