import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Carritovista = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartFromCookies = getCartFromCookies();
    setCart(cartFromCookies);
    calculateTotal(cartFromCookies);
  }, []);

  const getCartFromCookies = () => {
    try {
      const cartCookie = Cookies.get("cart");
      if (cartCookie) return JSON.parse(cartCookie);
      else return [];
    } catch (error) {
      console.error("Error retrieving cart from cookies:", error);
      return [];
    }
  };

  const calculateTotal = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  const handleRemoveFromCart = (key) => {
    const updatedCart = cart.filter((item) => item.key !== key);
    Cookies.set("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  return (
    <>
      <div className=" rounded-2xl border h-full md:p-4 md:w-1/2 px-10  w-full flex flex-col ">
        <div className="uppercase flex ml-10 mt-2 gap-2 items-center font-extrabold  text-4xl antialiased ">
          <svg
            className="w-10 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          Tu carrito
        </div>
        <div className="divider "></div>
        <ul className="flex flex-col gap-4   w-full overflow-y-auto ">
          {Object.values(cart).length ? (
            <ul className="flex flex-col gap-2 p-1 max-h-[500px] overflow-auto">
              {Object.values(cart).map((cartItem) => (
                <li
                  key={cartItem.key}
                  className="border-2 just rounded-xl  w-full h-[100px] flex gap-1"
                >
                  <div className="p-1  md:w-1/5 w-auto md:p-2">
                    <img
                      src={`https://backend-wolf-psi.vercel.app/imagen/${cartItem.imagen}`}
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-3/5 flex justify-center flex-col items-start px-4 ">
                    <p className="text-gray-700 text-xs mb-1 font-bold">
                      {cartItem.nombre}
                    </p>
                    <p className="text-gray-500 text-xs mb-1 font-semibold">
                      Cantidad :{cartItem.quantity}
                    </p>
                    <p className="text-gray-500 text-xs mb-1 font-semibold">
                      Color :{cartItem.color}
                    </p>
                    <p className="text-gray-500 text-xs mb-1 font-semibold">
                      Talla :{cartItem.talla}
                    </p>
                  </div>
                  <div className="w-1/5 flex justify-center flex-col gap-2 items-end px-4 ">
                    <button
                      onClick={() => handleRemoveFromCart(cartItem.key)}
                      className="rounded-full  "
                    >
                      <svg
                        className="w-6 h-6 text-red-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                    <button className="">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>¡Tu carrito está vacío!</p>
          )}
        </ul>
      </div>

      <div className=" rounded-2xl border h-full md:p-4 md:w-1/2  w-full flex flex-col ">
        <div className="uppercase flex  mt-2 gap-2 items-center font-extrabold  ml-10 text-4xl antialiased ">
          <svg
            className="w-12  text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
            />
          </svg>
          Factura
        </div>
        <div className="divider"></div>
        <p className="font-semibold overflow-auto text-gray-500 w-full ml-10  ">
          Lista de productos
        </p>
        {Object.values(cart).length ? (
          <ul className="flex flex-col gap-2 p-1 h-[250px] overflow-auto">
            {Object.values(cart).map((cartItem) => (
              <li
                key={cartItem.key}
                className="border-b mt-2 just rounded-xl justify-around  w-full flex gap-1"
              >
                <p className="self-center truncate w-1/5">{cartItem.nombre}</p>
                <div className="flex flex-col justify-center items-center ">
                  <p className="text-xs font-bold text-gray-500">Cantidad</p>
                  <p className="text-xs text-gray-500">{cartItem.quantity}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-bold text-gray-500">Talla</p>
                  <p className="text-xs text-gray-500">{cartItem.talla}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-bold text-gray-500">Color</p>
                  <p className="text-xs text-gray-500">{cartItem.color}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-bold text-gray-500">Valor</p>
                  <p className="text-xs text-gray-500">
                    {cartItem.price * cartItem.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ml-10">¡Que esperas , ve y ponte facha!</p>
        )}
        <div className="divider"></div>

        <ul className="flex flex-col gap-2 p-2 overflow-auto">
          <li className="border-b mt-2 just rounded-xl justify-between  w-full flex gap-1">
            <p className="text-xl capitalize">Total</p>
            <p>${total}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Carritovista;
