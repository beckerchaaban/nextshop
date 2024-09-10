import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Product } from "../../interfaces/Product";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from "../QuantityField";
import { ProductInventory } from "../../interfaces/ProductInventory";
import { CaretRight, Warehouse, X } from "@phosphor-icons/react";
import Divider from "../Divider";
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
interface InventoryStatusProps {
  inventories: ProductInventory[];
}
const InventoryStatus = ({ inventories }: InventoryStatusProps) => {
  const status = inventories?.some((x) => x.quantity > 0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = inventories.filter((inventory) =>
    inventory.inventoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className="p-2 border border-slate-400 rounded flex gap-4 items-center justify-between"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex gap-4 items-center">
          <Warehouse size={32} />
          <span>Lagerstatus</span>
          {status ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
        <CaretRight size={20} weight="bold" />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-hidden"
      >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="flex items-center justify-end min-h-screen p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-96 z-50 min-h-screen flex flex-col">
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <span>Lager</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full"
              >
                <X size={20} />
              </button>
            </DialogTitle>
            <p className="text-sm py-4">Sök efter lager</p>
            <input
              type="text"
              placeholder="Sök..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 mb-4 w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-100"
            />
            <div className="flex-1 overflow-y-auto bg-gray-100 rounded-md -mx-6">
              <ul>
                {filtered.map((inventory) => (
                  <li
                    key={inventory.id}
                    className="flex justify-between p-4 border-b"
                  >
                    <div className="font-bold">{inventory.inventoryName}</div>
                    <div className="flex gap-4 items-center text-sm">
                      {inventory.quantity}{" "}
                      {inventory.quantity ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
// Product Details Component
const ProductDetails: React.FC<{
  data: Product;
  onAddToCart: (productId: CartItemCreate) => void;
}> = ({ data, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const Cart = useNextshopApiSelector((state) => state.cart.Cart);
  const handleAddToCart = () => {
    onAddToCart({ productId: data.id, quantity: quantity });
  };
  useEffect(() => {
    setQuantity(1);
  }, [Cart.cartItems.length]);
  return (
    <div className="mt-4 w-2/5 p-8 bg-slate-200">
       <h1 className="text-2xl font-semibold">{data.name}</h1>
       <p className="mt-2 text-gray-600">{data.description}</p>
      <p className="text-xl font-bold pb-4">{data.price}:-</p>
      <InventoryStatus inventories={data.productInventories} />
      <div className="flex gap-4 pt-4">
        <QuantityField onHandle={setQuantity} quantity={quantity} />
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-6 w-full font-semibold text-sm hover:bg-blue-700 transition rounded"
          disabled={!data.isPurchasable}
        >
          Lägg till i Varukorgen
        </button>
      </div>
      <Divider />
      <div>[other_stuff]</div>
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
      <div className="flex flex-col gap-4 mt-4 w-3/5">
        <ProductImage
          src={data.imgUrl}
          alt={data.imgAlt || data.name || "Product Image"}
        />
      </div>

      <ProductDetails data={data} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
