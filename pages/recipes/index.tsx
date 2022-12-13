import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../../components/home/Header'
import styles from '../../styles/home/Home.module.css'
import Navbar from '../../components/common/navbar'
import RecipeCard from '../../components/home/RecipeCard'
import RecipeGrid from '../../components/home/RecipeGrid'

const Recipes: NextPage = () => {

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
        <meta name="description" content="Cooking, Life Stories, and more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} id="main">
        <RecipeGrid recipes={Recipes} />
      </main>
    </div>
  )
}

export default Recipes