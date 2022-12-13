import { useEffect, useState } from 'react';
import styles from '../../styles/home/Header.module.css';

const Header = () => {
    const [introText, setIntrotext] = useState("");
    useEffect(() => {
        // Home animation function
        function AnimateHome() {
            let intro = "Dulan Does Dishes - Coming Soon";
            let currHeaderText = intro[0];
            let i = 0;
            // Animate "typing"
            const headerElem = document.getElementById("header");
            const heroElem = document.getElementById("hero");
            const welcomeElem = document.getElementById("welcome")
            if (headerElem && heroElem && welcomeElem) {
                setTimeout(() => {
                    let headerHandle = setInterval(() => {
                        setIntrotext(currHeaderText);
                        i++;
                        currHeaderText = currHeaderText + intro[i];
                        if (i >= intro.length) {
                            // After animation ends, change height if the user has not scrolled yet
                            setTimeout(() => {
                                // Shrink header to expose content only if they haven't scrolled yet
                                // Use both documentElement for chrome, and body for everything else
                                // headerElem.style.height = "0";
                                headerElem.style.backgroundColor = "#79B4B7"
                                heroElem.style.opacity = "0";
                                welcomeElem.style.color = "#716F81";
                                // Shrink header to expose content only if they haven't scrolled yet
                                // Use both documentElement for chrome, and body for everything else
                                if (!document.documentElement.scrollTop && !document.body.scrollTop) {
                                    headerElem.style.height = "0";
                                    setTimeout(() => {
                                        // delete the element
                                        headerElem.remove();
                                    }, 1000);
                                } else {
                                    setTimeout(() => {
                                        // delete the element
                                        heroElem.style.visibility = "hidden";
                                    }, 1000);
                                }
                            }, 2500)
                            clearInterval(headerHandle);
                        }
                    }, 60)
                }, 600)
            } else {
                throw new Error("Could not get id header for Header.tsx");
            }
        }
        // Play video and animate header typing
        // React has an issue with the muted in the video tag not being set properly.
        const videoElem = document.getElementById("hero") as HTMLVideoElement;
        if (!videoElem) {
            throw new Error("Video id not found for Header.tsx");
        }
        document.addEventListener("DOMContentLoaded", () => {
            videoElem.muted = true;
        })
        videoElem.play(); // Might be necessary for chrome
        AnimateHome();
    }, []);
    return (
        <div className={styles.header} id="header">
            <div className={styles.welcome} id="welcome">
                {introText}
            </div>
            <video className={styles.hero} preload="auto" id="hero" autoPlay loop muted playsInline>
                <source src={"/static/hero.mp4"} type='video/mp4' />
                Video tag not supported
            </video>
        </div>
    )
}

export default Header