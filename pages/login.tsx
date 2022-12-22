import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEventHandler, useEffect, useState, useContext } from 'react';
import { login } from '../services/api/login';
import styles from '../styles/Login/Login.module.css';
import titleStyles from '../styles/common/title.module.css';
import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';
import { CircularProgress } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { jwtContext } from './_app';

const Login: NextPage = () => {
    const [password, setPassword] = useState<string>("");
    const [showPass, setShowPass] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginState, setLoginState] = useState<"logging-in" | "idle" | "error" | "success">("idle");

    const router = useRouter();

    const jwt = useContext(jwtContext);

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    }

    const handleShow = () => setShowPass(!showPass);

    const handleLogin = () => {
        setLoginState("logging-in");
    }

    useEffect(() => {
        if (loginState === "logging-in") {
            // make request
            login(password).then((res) => {
                // console.log(res);
                // save in local storage
                localStorage.setItem("jwt", res);
                // change provider
                if (jwt && jwt.setJWT) {
                    jwt.setJWT(res);
                } else {
                    console.error("setJWT function context or jwt is null")
                }
                setLoginState("success");
                router.push("/");
            }).catch((e) => {
                console.error(e);
                setLoginState("error");
                if (typeof e === "string") {
                    setErrorMessage(e);
                } else {
                    setErrorMessage("An unknown error has occurred.");
                }
            });
        }
    }, [loginState])

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
            </Head>

            <main id="main" className={styles["main"]}>
                <h1 className={titleStyles['generic-h1']}>Are you the dishwasher?</h1>
                <div className={styles['password-input']}>
                    <InputGroup pr='4.5rem'>
                        <Input type={showPass ? 'text' : 'password'} placeholder="Enter password..." onChange={handlePasswordInput} />
                        <InputRightElement width='4.5rem'>
                            <Button onClick={handleShow} colorScheme="teal">
                                {showPass ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
                <div className={styles["login-button-container"]}>
                    {loginState === "idle" || loginState === "error" ?
                        <Button onClick={handleLogin} color="teal">
                            Yes. Grant me access.
                        </Button>
                        :
                        loginState === "logging-in" ?
                            <CircularProgress isIndeterminate color="teal" />
                            :
                            null
                    }
                </div>
                <div className={styles["feedback"]}>
                    {loginState === "success" ?
                        <div className={styles["success"]}>
                            Welcome back!
                        </div>
                        :
                        loginState === "error" ?
                            <div className={styles["error"]}>
                                AN ERROR HAS OCCURRED:
                                <br />
                                <br />
                                {errorMessage}
                            </div>
                            :
                            null
                    }
                </div>
            </main>
        </div>
    )
}

export default Login