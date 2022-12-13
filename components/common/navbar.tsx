import React, { useState } from 'react'
import styles from '../../styles/common/navbar.module.css'

const Navbar = () => {
    const [responsiveClass, setResponsive] = useState("inactive");
    // function scrolling(id: string) {
    //     if (responsiveClass === "is-responsive") {
    //         setResponsive('inactive');
    //     }
    //     const scrollingDocument = document.getElementById(id);
    //     if (scrollingDocument) {
    //         scrollingDocument.scrollIntoView({ behavior: "smooth" });
    //     } else {
    //         // throw new Error(`Could not find ${id} id.`);
    //         console.error(`Could not find ${id} id.`);
    //     }
    // }

    function toggleBurger() {
        // console.log("Burger clicked");
        if (responsiveClass === "inactive") {
            setResponsive('is-responsive');
        } else {
            setResponsive('inactive');
        }
    }

    return (
        <nav className={`${styles.navbar} ${styles[responsiveClass]}`} id="navbar">

            {/* eslint-disable-next-line */}
            <a className={styles["nav-link"]} href="/"><span>Dulan Does Dishes</span></a>
            {/* eslint-disable-next-line */}
            <a className={styles["nav-link"]} href="/recipes"><span>Recipes</span></a>

            <div className={`${styles.hamburger} ${styles[responsiveClass]}`} id="hamburger" onClick={() => toggleBurger()}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </nav>
    )

}

export default Navbar;