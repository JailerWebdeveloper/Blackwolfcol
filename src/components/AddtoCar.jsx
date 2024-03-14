import { addCartItem, cartItems } from "../services/Store";
import { useState } from "react";
const AddToCartButton = ({ id, producto }) => {
  const [cantidad, setcantidad] = useState(1);
  const opciones = producto.TallasColores;
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const handleClick = () => {
    addCartItem({ id: id, quantity: cantidad , talla : talla, color : color , price:producto.price ,nombre:producto.NombreProducto,imagen:producto.Imagen});
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

  console.log(cantidad)
  console.log(talla)
  console.log(color)
  return (
    <>
      <div className="flex flex-col justify-center mt-6 items-start mb-5">
        <div className="flex items-center">
          <span className="mr-3">Color</span>
          <div className="w-full flex gap-5">
            {opciones.map((valor) => (
              <button
                onClick={() => seleccionarcolor(valor.Color)}
                className="btn w-32 hover:ring transition-all focus:bg-black focus:text-white text-black border-2 border-gray-400 border-dashed focus:border-none"
              >
                {valor.Color}
              </button>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex items-center">
          <span className="mr-3">Talla</span>
          <div className="w-full flex gap-5">
            {opciones.map((valor) => (
              <button
                onClick={() => seleccionartalla(valor.Talla)}
                className={`btn w-32 hover:ring transition-all ${talla==valor.talla ?"bg-black text-white  border-none" :""}  text-black border-2 border-gray-400 border-dashed`}
              >
                {valor.Talla}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        id="añadircarrito"
        className=" flex md:justify-normal  md:gap-5 py-5 justify-between "
      >
        <div className="join">
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
          className={`btn btn-primary btn-wide ${ talla=="" || color =="" || cantidad==0 ? "btn-disabled" : "btn-primary"}  `}
          form="añadircarrito"
          onClick={handleClick}
        >
          Añadir al carrito
        </button>
      </div>
    </>
  );
};

export default AddToCartButton;
