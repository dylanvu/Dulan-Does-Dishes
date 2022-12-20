import styles from "../../styles/common/footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const year = new Date().getFullYear();
    const logoSize = "70px";
    return (
        <footer className={styles["footer"]}>
            <div>
                Dulan Does Dishes
            </div>
            <div>
                {year === 2022 ? `2022` : `2022 - ${year}`}
            </div>
            <br />
            <br />
            <div>
                <Link href="/login">
                    <Image src="/static/img/logo-small.png" alt="Dulan Does Dishes Logo" width={logoSize} height={logoSize} />
                </Link>
            </div>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </footer>
    )
}

export default Footer;