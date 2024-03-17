export const GetAllProducts = async () => {
  const res = await fetch(
    `https://backend-wolf-psi.vercel.app/Productos/todos`
  );
  const data = await res.json();
  return data;
};
