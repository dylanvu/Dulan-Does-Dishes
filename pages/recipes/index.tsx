import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../../styles/home/Home.module.css'
import RecipeCard from '../../components/home/RecipeCard'
import RecipeGrid from '../../components/home/RecipeGrid'

const Recipes: NextPage = () => {

  const Recipes: RecipeCard[] = [
    {
      img: "/static/img/steak.jpg",
      title: "Watermelon Steak"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho "
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 1"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 2"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 3"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 5"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 6"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 7"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 8"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 9"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 10"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 11"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 12"
    },
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking, Life Stories, and more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} id="main">
        <RecipeGrid recipes={Recipes} size="small" flex={true} />
      </main>
    </div>
  )
}

export default Recipes