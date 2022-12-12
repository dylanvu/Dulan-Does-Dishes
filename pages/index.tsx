import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/home/Header'
import styles from '../styles/home/Home.module.css'
import Navbar from '../components/common/navbar'
import RecipeCard from '../components/home/RecipeCard'
import RecipeGrid from '../components/home/RecipeGrid'

const Home: NextPage = () => {

  const Recipes: RecipeCard[] = [
    {
      img: "/static/img/steak.jpg",
      title: "Watermelon Steak, the most cursed food I've ever seen"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho1"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho2"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho3"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho5"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho6"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho7"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho8"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho9"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho10"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho11"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho12"
    },
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} id="main">
        <Header />
        <Navbar />
        <RecipeGrid recipes={Recipes} />
      </main>
    </div>
  )
}

export default Home

{/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}

{/* <footer className={styles.footer}>
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
</footer> */}