import { FREE_GIFT } from "../../constants/product";
import React from "react";

const CartItem = (props) => {
  const { cartProduct, updateQuantityHandler } = props;

  // To increment cart product quantity
  const incrementQuantityHandler = () =>
    updateQuantityHandler(cartProduct, cartProduct.count + 1);

  // To Decrement cart product quantity
  const decrementQuantityHandler = () =>
    updateQuantityHandler(cartProduct, cartProduct.count - 1);

  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="mb-1 font-semibold">{cartProduct.name}</p>
        <span>
          ₹{cartProduct.price} * {cartProduct.count} = ₹
          {cartProduct.price * cartProduct.count}
        </span>
      </div>
      {cartProduct.id !== FREE_GIFT.id ? (
        <div className="flex items-center gap-4">
          <button
            className="flex h-8 w-8 items-center justify-center bg-red-600 text-white font-medium rounded-md"
            onClick={decrementQuantityHandler}
          >
            -
          </button>
          <span>{cartProduct.count}</span>
          <button
            className="flex h-8 w-8 items-center justify-center bg-green-600 text-white font-medium rounded-md"
            onClick={incrementQuantityHandler}
          >
            +
          </button>
        </div>
      ) : (
        <span className="uppercase text-green-800 px-3 py-1 text-xs font-medium rounded-full bg-green-200">
          Free Gift
        </span>
      )}
    </div>
  );
};

export default CartItem;
