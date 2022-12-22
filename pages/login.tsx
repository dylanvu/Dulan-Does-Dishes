import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { login } from '../services/api/login';
import styles from '../styles/Login/Login.module.css';


const Login: NextPage = () => {
    useEffect(() => {
        login("mushroomparmesanrisotto2").then((res) => {
            console.log(res);
            // save in local storage
            localStorage.setItem("jwt", res);
        }).catch((e) => {
            console.error(e);
        })
    }, [])
    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
            </Head>

            <main id="main">
                Login Coming soon!
            </main>
        </div>
    )
}

export default Login