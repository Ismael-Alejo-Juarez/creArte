import Header from '@/components/Header';
import NavCategories from '@/components/NavCategories';
import Product from '@/components/Product';
import Footer from '@/components/Footer';
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <NavCategories />
      {/* Aquí se van a listar todos los productos dependiendo
      de la selección en NavCategories*/}
      <div className={`${styles.listProducts}`}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <Footer />
    </>
  );
}