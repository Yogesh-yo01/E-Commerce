import { Fragment, useEffect, useState } from "react";
import {useSearchParams}from 'react-router-dom';
import ProductCard from "../components/ProductCard"

export default function Home(){

  const [products,setProducts] = useState([]); 

  const [searchParams,setSearchParams]=useSearchParams();
  //Fetching API for All Products
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_URL+'/product?'+searchParams)
    .then(res =>res.json())
    .then( res => setProducts(res.products)) 
  },[searchParams])
  
    return <Fragment>
       

        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">
            { products.map(product => <ProductCard product={product}/>)}        
          </div>
        </section>

        
    </Fragment>
}