export const GetproductImage =async (image) =>{
    const res = await fetch(
        `https://backend-wolf.vercel.app/imagen/${image}`
      );
      const data = await res;
      return data;
}