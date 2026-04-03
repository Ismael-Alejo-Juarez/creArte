import Header from '@/components/Header';
import Product from '@/components/Product';
import Footer from '@/components/Footer';
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import { raleway, ralewayS } from '@/fonts/Raleway';
import { supabase } from '@/lib/supabase';
import { capitalize } from '@/fonts/Capitalize';

export default function Home({ categories, products }) {
  const [categorieActual, setCategorie] = useState('todo');
  if (categories.length === 0) return <p>Cargando... </p>
  return (
    <>
      <Header />
      {/* NAV para categorías */}
      <div className={styles.navCategories}>
        <button type='button'
          className={`
        ${styles.btnCategoria}
        ${categorieActual == 'todo' ? ralewayS.className : raleway.className}`}
          onClick={() => setCategorie('todo')}>
          {/* Botón que, al ser presionado, lista todos los productos disponibles
            con un límite de 20 */}
          Todo
        </button>
        {categories.map((category) => (
          <>
            <span className={styles.separator}>|</span>
            <button type='button'
              className={`
              ${styles.btnCategoria}
              ${categorieActual == category.nameCategory ? ralewayS.className : raleway.className}`}
              onClick={() => setCategorie(`${category.nameCategory}`)}>
              {capitalize(category.nameCategory)}
            </button>
          </>
        ))}
      </div>
      {/* Aquí se van a listar todos los productos dependiendo
      de la selección en NavCategories*/}
      {/* Depende de la pestaña actual */}
      {categorieActual == 'todo' ? (
        <div className={`${styles.listProducts}`}>
          {products.length === 0 ? (
            <p>Vacio</p>
          ) : products.map((product) => (
            <Product key={product.idProduct} id={product.idProduct} name={product.name} price={product.price} image={product.ImageProduct[0]} />
          ))}
        </div>
      ) : (
        <div className={`${styles.listProducts}`}>
          {products.length === 0 ? (
            <p>Vacio</p>
          ) : products.map((product) => (
            <Product key={product.idProduct} id={product.idProduct} name={product.name} price={product.price} image={product.ImageProduct[0]} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  // Traer categorías
  const { data, error } = await supabase
    .from('Category')
    .select('*');
  // Traer productos
  const { data: products, error: eproducts } = await supabase
    .from('Product')
    .select('idProduct')
    .range(0, 11);
  // En este arreglo se van a guardar los productos con sus imagenes
  const productList = [];
  for (let j = 0; j < products.length; j++) {
    const id = products[j].idProduct;
    // Por cada elemento, traeme todo, tanto producto como imagen
    const { data: prdImg, error: erPrdImg } = await supabase
      .from('Product')
      .select(`
      idProduct,
      name,
      price,
      ImageProduct(
        url,
        order
      )
      `)
      .eq('idProduct', id)
      .single();
    if(erPrdImg) return { props: { categories: [], products: [] } };
    // Mandamos al arreglo
    productList.push(prdImg);
  }
  if (error || eproducts) return { props: { categories: [], products: [] } };
  return { props: { categories: data, products: productList } };
}