import React from 'react'
import { useParams } from 'react-router-dom';
import ProductDetails from "../Products/ProductDetails";

const ProductPage = ({fetchQuantity}) => {
  const { id } = useParams();

  return (
    <div>
      <ProductDetails productId={id} fetchQuantity={fetchQuantity} />
    </div>
  );
}

export default ProductPage