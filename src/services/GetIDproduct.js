export const GetIDproduct =async (id) =>{
    const res = await fetch(
        `https://backend-wolf.vercel.app/ProductoIndividual/${id}`
      );
      const data = await res.json();
      return data;
}