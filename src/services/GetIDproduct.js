export const GetIDproduct =async (id) =>{
    const res = await fetch(
        `https://backend-wolf-psi.vercel.app/ProductoIndividual/${id}`
      );

try{
  const data = await res.json();
  return data;
}catch{
 return "NotFound"
}
}