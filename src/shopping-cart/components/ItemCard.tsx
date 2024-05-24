"use client";

import Image from "next/image";

import { IoAddCircleOutline, IoRemove } from "react-icons/io5";
import { addProductToCart, removeSingleItemFromCart } from "../actions/actions";

import { useRouter } from "next/navigation";
import { Product } from "@/products";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(product.id);
    router.refresh();
  };

  const onRemoveItem = () => {
    removeSingleItemFromCart(product.id);
    router.refresh();
  };

  return (
    <div className="flex items-center w-full bg-gray-800 border-gray-100 rounded-lg shadow">
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col w-full px-5 pb-5 mt-2">
        <a href="#">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {product.name} -{" "}
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>

        <div className="flex flex-col items-start justify-between">
          <span className="text-gray-900 dark:text-white">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-white">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center p-5">
        <button
          onClick={onAddToCart}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className="mx-10 text-2xl text-white">{quantity}</span>
        <button
          onClick={onRemoveItem}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  );
};
