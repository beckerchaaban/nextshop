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
import VariantSelector from '../VariantSelector';
import { Category } from "interfaces/Category";
import Link from "next/link";
// Product Image Component


// Main Product Page Component
interface CategoryPageProps {
    url:string;
}
interface ProductsPageProps {
  items: Product[];
  categories:Category[];
}
const ProductsComponent: React.FC<ProductsPageProps> = ({ items, categories }) => {
  return (
      <div className="flex">
          {/* Sidebar for Categories */}
          <aside className="w-1/4 p-4 bg-gray-100">
              <h2 className="text-lg font-semibold">Categories</h2>
              <ul className="mt-2">
                  {categories.map((category) => (
                      <li key={category.id} className="py-2 hover:text-blue-500 cursor-pointer">
                          {category.name}
                      </li>
                  ))}
              </ul>
          </aside>

          {/* Products List */}
          <main className="w-3/4 p-4">
              <h1 className="text-2xl font-bold">Products</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {items.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 shadow-md">
                          <Link href={`/product/${product.id}`}>
                          <img src={product.imgUrl} alt={product.imgAlt} className="w-full h-32 object-cover rounded" />
                          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                          <p className="text-gray-600">{product.description}</p>
                          <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
                          </Link>
       
                          {product.isPurchasable && (
                              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                                  Add to Cart
                              </button>
                          )}
                      </div>
                  ))}
              </div>
          </main>
      </div>
  );
};
const CategoryPage =({url}:CategoryPageProps) => {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const {Products} = useNextshopApiSelector(state => state.products);

  const dispatch = useNextshopApiDispatch();
  const handleAddToCart = (cartItem: CartItemCreate) => {
    setModalOpen(true);
    dispatch(createCartItem(cartItem));
  };

  return (
    <div className="">
category {url}

<ProductsComponent items={Products} categories={[]} />
    </div>
  );
};

export default CategoryPage;
