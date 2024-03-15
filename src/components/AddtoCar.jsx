import { addCartItem, cartItems } from "../services/Store";
import { useState } from "react";
const AddToCartButton = ({ id, producto }) => {
  const [cantidad, setcantidad] = useState(1);
  const opciones = producto.TallasColores;
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const handleClick = () => {
    addCartItem({
      id: id,
      quantity: cantidad,
      talla: talla,
      color: color,
      price: producto.price,
      nombre: producto.NombreProducto,
      imagen: producto.Imagen,
    });
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

  return (
    <>
    <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">Selecciona el Color</p>
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
        <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">Selecciona la Talla</p>

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
          onClick={handleClick}
        >
          Añadir al carrito
        </button>
      </div>
    </>
  );
};

export default AddToCartButton;
