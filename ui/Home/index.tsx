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
// Product Image Component


// Main Product Page Component
const HomePage: React.FC<{}> = ({}) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const dispatch = useNextshopApiDispatch();
  const handleAddToCart = (cartItem: CartItemCreate) => {
    setModalOpen(true);
    dispatch(createCartItem(cartItem));
  };

  return (
    <div className="">
home
    </div>
  );
};

export default HomePage;
