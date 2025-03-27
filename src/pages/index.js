import { useState } from "react";
import { CartItem, CartSummary } from "../components/Cart";
import { ProductCard } from "../components/product";
import { FREE_GIFT, PRODUCTS, THRESHOLD } from "../constants/product";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // To toggle free product
  const toggleFreeProductHandler = (updatedCartItems) => {
    let total = 0;
    updatedCartItems.forEach((cartItem) => {
      total += cartItem.count * cartItem.price;
    });
    const freeProductIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === FREE_GIFT.id
    );
    if (total >= THRESHOLD && freeProductIndex === -1) {
      setShowToast(true);
      setCartItems([...updatedCartItems, { ...FREE_GIFT, count: 1 }]);
    } else if (total < THRESHOLD && freeProductIndex !== -1) {
      const items = updatedCartItems.filter((item) => item.id !== FREE_GIFT.id);
      setCartItems(items);
    }
    setSubtotal(updatedCartItems.length > 0 ? total : 0);
    setProgressPercentage((total * 100) / THRESHOLD);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // Too add the product to cart
  const addCartItemHandler = (product) => {
    // Check is the product exist in cart or not
    const isProductAvailableInCart = cartItems.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    if (isProductAvailableInCart !== -1) {
      const cartProducts = [...cartItems];
      cartProducts[isProductAvailableInCart].count =
        cartProducts[isProductAvailableInCart].count + 1;
      setCartItems(cartProducts);
      toggleFreeProductHandler(cartProducts);
    } else {
      const updatedProducts = [...cartItems, { ...product, count: 1 }];
      setCartItems(updatedProducts);
      toggleFreeProductHandler(updatedProducts);
    }
  };

  // Logic for update the cart quantity
  const updateQuantityHandler = (product, quantity) => {
    const productIndex = cartItems.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    const cartProducts = [...cartItems];
    if (quantity === 0) {
      cartProducts.splice(productIndex, 1);
    } else {
      cartProducts[productIndex].count = quantity;
    }
    setCartItems(cartProducts);
    toggleFreeProductHandler(cartProducts);
  };

  return (
    <div className="px-10 md:px-16 lg:px-20 relative">
      {showToast && (
        <div className="fixed z-20 right-10 top-10 py-2 px-6 rounded-3xl font-medium bg-green-300">
          Free product has added
        </div>
      )}
      <section className="pb-16">
        <h1 className="text-3xl text-center font-bold mt-6 mb-10 md:my-6">
          Shopping Cart App
        </h1>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-10">
            {PRODUCTS.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  addCartItemHandler={addCartItemHandler}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3">Cart Summary</h2>
        <div className="">
          <div className="mb-6">
            <CartSummary
              progressPercentage={progressPercentage}
              subtotal={subtotal}
            />
          </div>
          {cartItems.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Cart Items</h2>
              <div className="flex flex-col gap-4">
                {cartItems.map((cartItem, index) => {
                  return (
                    <CartItem
                      cartProduct={cartItem}
                      key={index}
                      updateQuantityHandler={updateQuantityHandler}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
