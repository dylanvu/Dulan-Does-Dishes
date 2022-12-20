import React, { useState } from 'react';
import styles from '../../styles/common/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

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
            <Link href="/">
                <div className={`${styles["main-link"]} ${styles["link"]}`}>
                    <Image src="/static/img/logo-small.png" width={logoSize} height={logoSize} alt="Dulan Does Dishes Logo" />
                    <span>Dulan Does Dishes</span>
                </div>
            </Link>


            <Link href="/about">
                <div className={styles["link"]}>About</div>
            </Link>

            <Link href="/recipes">
                <div className={styles["link"]}>Recipes</div>
            </Link>


            <a className={styles["link"]} target="_blank" rel="noopener noreferrer" href="https://vu-dylan.github.io/"><span>&quot;Cooking&apos;s like coding!&quot;</span></a>
            <div className={`${styles.hamburger} ${styles[responsiveClass]}`} id="hamburger" onClick={() => toggleBurger()}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </nav>
    )

}

export default Navbar;