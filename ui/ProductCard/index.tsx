import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Product } from '../../interfaces/Product';

interface ProductCardProps extends Product {}
const ProductCard = ({...product}:ProductCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={product.imgUrl} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-900 font-bold text-lg">{product.price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 max-w-sm w-full">
            <DialogTitle className="text-lg font-bold">{product.name}</DialogTitle>
            <div className="mt-2 text-gray-600">
              {product.description}
            </div>
            <p className="mt-4 text-gray-900 font-bold text-lg">{product.price}</p>
            <div className="mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCard;