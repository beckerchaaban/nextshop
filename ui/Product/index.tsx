import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Product } from "../../interfaces/Product";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from '../QuantityField';
// Product Image Component
const ProductImage: React.FC<{ src?: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return (
    <div className="flex justify-center w-full">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-lg w-full max-w-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-full max-w-lg h-64 bg-gray-200 rounded-lg shadow-lg">
          <span className="text-gray-500">Image Not Available</span>
        </div>
      )}
    </div>
  );
};

// Product Details Component
const ProductDetails: React.FC<{
    data: Product;
    onAddToCart: (productId: CartItemCreate) => void;
  }> = ({ data, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
  const Cart = useNextshopApiSelector(state => state.cart.Cart)
    const handleAddToCart = () => {
      onAddToCart({ productId: data.id, quantity:quantity });
    };
  useEffect(()=>{
    setQuantity(1);
  },[Cart.cartItems.length])
    return (
      <div className="mt-4 w-2/5 p-8 bg-slate-200">
        <p className="text-xl font-semibold">{data.price}:-</p>
        {data.productInventories?.some(x => x.quantity > 0) ? <div>I lager</div>: <div>Ej i lager</div>}
        <div className="flex gap-2 pt-4">
        <QuantityField onHandle={setQuantity} quantity={quantity} />
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-4 px-6 w-full font-semibold text-xs hover:bg-blue-700 transition"
          disabled={!data.isPurchasable}
        >
          Lägg till i Varukorgen
        </button>
        </div>
      </div>
    );
  };
  

// Main Product Page Component
const ProductPage: React.FC<{ data: Product }> = ({ data }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const dispatch = useNextshopApiDispatch();
  const handleAddToCart = (cartItem: CartItemCreate) => {
    setModalOpen(true);
    dispatch(createCartItem(cartItem));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-4 w-full">
      <div className="flex flex-col gap-4  w-3/5">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <ProductImage
          src={data.imgUrl}
          alt={data.imgAlt || data.name || "Product Image"}
        />
        <p className="mt-2 text-gray-600">{data.description}</p>
      </div>

      <ProductDetails data={data} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
