import axios from "axios";

export const GetAllProducts = async () => {
  const res = await fetch(
    `https://backend-wolf-psi.vercel.app/Productos/todos`
  );
  const data = await res.json();
  return data;
};


 export const handleSubscribir = async (dataform) => {
  const requestBody = { dataform };
  console.log("Solicitud de Subscricion:", requestBody);
  try {
    const response = await axios.post(
      `https://backend-wolf-psi.vercel.app/Creacion/factura`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (!response.data) {
      throw new Error("Failed to create factura");
    }
    const data = response.data;
    console.log(data);
    const facturaLink = data;
    return facturaLink;
  } catch (error) {
    console.error("Error al intentar comprar:", error);
  }
  
};
