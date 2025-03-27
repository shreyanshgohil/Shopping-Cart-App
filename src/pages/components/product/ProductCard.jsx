import React from "react";

const ProductCard = (props) => {
  const { product, addCartItemHandler } = props;

  return (
    <div className="p-4 rounded-lg shadow-2xl bg-white">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <span className="font-medium mb-2 block">&#8377;{product.price}</span>
      <button
        className="text-white font-medium bg-blue-600 hover:bg-blue-500 transition-all duration-200 w-full p-1.5 rounded-md"
        onClick={() => addCartItemHandler(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
