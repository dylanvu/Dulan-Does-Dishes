import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/about/About.module.css';


const Custom404: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
            </Head>

            <main id="main">
                404 - Not Found.

                Not sure how you got here... but please go back!
            </main>
        </div>
    )
}

export default Custom404