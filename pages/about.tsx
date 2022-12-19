import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/about/About.module.css';
import titleStyles from "../styles/common/title.module.css";



const About: NextPage = () => {
    const takeAways: string[] = ["Dynamic Routes using Next.js and server-side rendering", "First legit full-stack project I built by myself from scratch, also with TypeScript and Next.js", "Scrollable Observers", "A bit more difficult CSS styling (those tiltled pictures tilted me)", "Using more Chakra UI components", "Drag and drop UI and creating a field editor from scratch", "Working with a filtering and tagging system"];

    const techstack: string[] = ["Next.js", "TypeScript", "Firestore", "Chakra UI"]

    return (
        <div className={styles["about"]}>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="main" className={styles["about-main"]}>
                <h1 className={titleStyles["generic-h1"]}>About the Dishwasher</h1>
                <div className={styles["about-picture-container"]}>
                    <Image src="/static/img/logo.png" width="400vw" height="400vw" />
                </div>
                <div className={styles["bio"]}>
                    Heyo, I'm Dylan. My "name" (Dulan) comes from a common typo I used to make on accident, and how I somehow always end up being the dishwasher when I cook with my friends. I drew this raccoon (yes, it's a raccoon) while designing a shirt for UCSB AIChE.
                    <br />
                    <br />
                    I started actually cooking after I started interning for a software and engineering company in December 2020 and wanted to make my own lunches. My approach to cooking is how I approach coding: I pick a central ingredient or theme, and make dishes entirely solely surrounding that ingredient or theme for about a month while trying to gradually ramp up the difficulty/complexity of the dish. I have an Instagram too: @DulanDoesDishes
                    <br />
                    <br />
                    Enjoy my life stories, bad plating, and alright food!
                </div>
                <br />
                <br />
                <br />

                <h1 className={titleStyles["generic-h1"]}>For the Coding Nerds Only</h1>
                <div className={styles["bio"]}>
                    You know what I like as much as cooking?
                    <br />
                    <br />
                    Coding.
                    <br />
                    <br />
                    This website was my way of learning Next.js and beefing (heh) up my UI skills. Kind of like how I approach learning how to cook. I think cooking's a bit like coding actually. Maybe this is why cooking is a pretty stereotypical hobby for CS majors. I'm most proud especially with the recipe editor/creator. This website's currently the culmination of my standard web development knowledge as of 12/19/2022 (so nearly 2 years or so since I learned React.js) and I think this sort of serves as a landmark/checkpoint in my current abilities. I developed most of this website over the winter break.
                    <br />
                    <br />
                    Here are the things I learned/took away/advanced in from this project:
                    <br />
                    <br />
                    <ul>
                        {takeAways.map((lesson, index) => {
                            return (
                                <li key={"takeaway-" + index}>
                                    {lesson}
                                </li>
                            )
                        })}
                    </ul>
                    <br />
                    <br />
                    Tech Stack
                    <br />
                    <br />
                    <ul>
                        {techstack.map((lesson, index) => {
                            return (
                                <li key={"takeaway-" + index}>
                                    {lesson}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <br />
                <br />
            </main>
        </div>
    )
}

export default About