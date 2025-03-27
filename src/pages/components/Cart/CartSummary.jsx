import React from "react";
import { THRESHOLD } from "@/pages/constants/product";
const CartSummary = (props) => {
  const { progressPercentage, subtotal } = props;
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xl font-semibold ">Subtotal:</p>
        <span className="font-semibold text-2xl">&#8377;{subtotal}</span>
      </div>
      <div className="bg-black w-full mb-3" style={{ height: "1px" }} />
      {subtotal < THRESHOLD ? (
        <div className="bg-blue-200 p-4 rounded-lg">
          <p className="font-medium opacity-90 mb-2">
            Add &#8377; {THRESHOLD - subtotal} more to get a Free Wireless mouse
          </p>
          <div
            className="cart--progressbar overflow-hidden h-2 w-full bg-gray-100 rounded-full relative after:content[''] after:absolute after:left-0 after:top-0 after:h-full after:max-w-full after:bg-blue-500"
            style={{
              "--free-product-progress": `${progressPercentage}%`,
            }}
          />
        </div>
      ) : (
        <p className="font-medium opacity-90 ">
          You got a free Wireless Mouse!
        </p>
      )}
    </div>
  );
};

export default CartSummary;
