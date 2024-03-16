import { useState, useRef } from "react";
import Cookies from "js-cookie";

const AddToCartButton = ({ id, producto }) => {
  const [cantidad, setcantidad] = useState(1);
  const opciones = producto.TallasColores;
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handlereloadpage = () =>{
    window.location.reload();
  
  }
  const handleAddToCart = () => {
    if (talla && color && cantidad > 0) {
      const cartItems = getCartFromCookies() || [];
      const existingItem = cartItems.find(
        (item) => item.id === id && item.talla === talla && item.color === color
      );

      if (existingItem) {
        // Update existing item quantity if already in cart
        existingItem.quantity += cantidad;
      } else {
        // Add new item to cart
        cartItems.push({
          id,
          quantity: cantidad,
          talla,
          color,
          price: producto.Precio,
          nombre: producto.NombreProducto,
          imagen: producto.Imagen[0],
        });
      }

      setCartInCookies(cartItems);
      modalRef.current.click();

      // Open modal after adding item to cart
    } else {
      // Handle error or notification for missing selections/quantity
      console.error("Please select color, size, and quantity.");
    }
  };

  const seleccionartalla = (value) => {
    settalla(value);
  };

  const seleccionarcolor = (value) => {
    setcolor(value);
  };

  const añadir = () => {
    setcantidad(cantidad + 1);
  };

  const disminuir = () => {
    setcantidad(cantidad - 1);
  };

  const modificar = () => {
    const input = document.getElementById("total");
    const newCantidad = parseInt(input.value, 10);
    setCantidad((prevCantidad) => Math.max(prevCantidad, newCantidad));
  };

  const getCartFromCookies = () => {
    try {
      const cartCookie = Cookies.get("cart");
      return cartCookie ? JSON.parse(cartCookie) : null;
    } catch (error) {
      console.error("Error retrieving cart from cookies:", error);
      return null;
    }
  };

  const setCartInCookies = (cartItems) => {
    try {
      Cookies.set("cart", JSON.stringify(cartItems), { expires: 1 , path: "/" } ); // Set expiration to 7 days
    } catch (error) {
      console.error("Error storing cart in cookies:", error);
    }
  };

  return (
    <>
      <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">
        Selecciona el Color
      </p>
      <div className="grid md:grid-cols-4 p-1 grid-cols-2 mb-5 grid-rows-auto overflow-auto w-full gap-2">
        {opciones.map((valor) => (
          <button
            key={valor.Color}
            onClick={() => seleccionarcolor(valor.Color)}
            className={`btn w-full hover:ring transition-all ${
              valor.Color === color
                ? "bg-black text-white border-none"
                : "text-black border-2 border-gray-400 border-dashed"
            } `}
          >
            {valor.Color}
          </button>
        ))}
      </div>
      <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">
        Selecciona la Talla
      </p>

      <div className="grid md:grid-cols-4 p-1 grid-cols-2 grid-rows-auto overflow-auto w-full gap-2">
        {opciones.map((valor) => (
          <button
            key={valor.Talla}
            onClick={() => seleccionartalla(valor.Talla)}
            className={`btn w-full hover:ring transition-all ${
              valor.Talla === talla
                ? "bg-black text-white border-none"
                : "text-black border-2 border-gray-400 border-dashed"
            } `}
          >
            {valor.Talla}
          </button>
        ))}
      </div>
      <div className="divider"></div>
      <div
        id="añadircarrito"
        className=" flex md:flex-row flex-col  w-full items-center justify-center gap-5"
      >
        <div className="join md:w-1/2 ">
          <button
            className={`btn btn-primary join-item ${
              cantidad === 0 ? "btn-disabled" : ""
            }`}
            onClick={disminuir}
          >
            -
          </button>
          <input
            id="total"
            type="number"
            value={cantidad}
            onChange={modificar}
            className="btn join-item"
          />
          <button className="btn btn-primary join-item" onClick={añadir}>
            +
          </button>
        </div>
        <button
          className={`btn btn-primary mx-auto md:w-1/2 w-full ${
            talla == "" || color == "" || cantidad == 0
              ? "btn-disabled"
              : "btn-primary"
          }  `}
          form="añadircarrito"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </button>

        <a ref={modalRef} href="#my_modal_8" className="btn hidden absolute  ">
          open modal
        </a>
        <div className="modal  " role="dialog" id="my_modal_8">
          <div className="modal-box w-full gap-2 flex flex-col justify-center">
            <svg
              className="w-10 h-10 self-center text-blue-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                clip-rule="evenodd"
              />
            </svg>

            <h3 className="font-bold self-center  text-lg">
              Producto Añadido!
            </h3>
            <p className="text-body text-gray-500 font-semibold ">Detalles</p>
            <div className="border-b flex w-full justify-between">
              <p className="text-body text-gray-500 font-semibold ">Producto</p>
              <p className=" text-black uppercase tracking-tight font-semibold">
                {" "}
                {producto.NombreProducto}
              </p>
            </div>
            <div className="border-b flex w-full justify-between">
              <p className="text-body text-gray-500 font-semibold ">Precio</p>
              <p className=" text-black uppercase tracking-tight font-semibold">
                {" "}
                ${producto.Precio}
              </p>
            </div>
            <div className="border-b flex w-full justify-between">
              <p className="text-body text-gray-500 font-semibold ">Cantidad</p>
              <p className=" text-black uppercase tracking-tight font-semibold">
                {" "}
                {cantidad}
              </p>
            </div>
            <div className="border-b flex w-full justify-between">
              <p className="text-body text-gray-500 font-semibold ">Talla</p>
              <p className=" text-black uppercase tracking-tight font-semibold">
                {" "}
                {talla}
              </p>
            </div>
            <div className="border-b flex w-full justify-between">
              <p className="text-body text-gray-500 font-semibold ">Color</p>
              <p className=" text-black uppercase tracking-tight font-semibold">
                {" "}
                {color}
              </p>
            </div>

            <div className="modal-action flex justify-between">
              <a href="/" className="btn bg-green-300 text-black">
                <svg
                  className="w-6 h-6 "
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
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z"
                  />
                  <path
                    fill="currentColor"
                    d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
                  />
                </svg>
                Seguir comprando
              </a>

              <a href="/Compras" className="btn bg-black text-white">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
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
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                Ir al carrito
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartButton;
