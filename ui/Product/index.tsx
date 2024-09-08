import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {Product} from '../../interfaces/Product';
import { useNextshopApiDispatch } from '../../api';
import { createCartItem } from '../../api/cart';
import { CartItemCreate } from '../../interfaces/CartItem';
// Product Image Component
const ProductImage: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
    return (
      <div className="flex justify-center w-3/5">
        {src ? (
          <img src={src} alt={alt} className="rounded-lg shadow-lg w-full max-w-lg" />
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
  onAddToCart: (cartItem:CartItemCreate) => void;
}> = ({ data, onAddToCart }) => {
  return (
    <div className="mt-4 w-2/5">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="mt-2 text-gray-600">{data.description}</p>
      <p className="mt-4 text-xl font-semibold">${data.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart({productId:data.id, quantity:1})}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        disabled={!data.isPurchasable}
      >
        Lägg till i Varukorgen
      </button>
    </div>
  );
};



// Main Product Page Component
const ProductPage: React.FC<{ data: Product }> = ({ data }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
const dispatch = useNextshopApiDispatch();
  const handleAddToCart = (cartItem:CartItemCreate) => {
    setModalOpen(true);
    dispatch(createCartItem(cartItem));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-4 w-full">
 <ProductImage src={data.imgUrl} alt={data.imgAlt || data.name || 'Product Image'} />
      <ProductDetails data={data} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;