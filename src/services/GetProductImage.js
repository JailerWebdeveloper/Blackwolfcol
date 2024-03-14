export const GetproductImage =async (image) =>{
    const res = await fetch(
        `https://backend-wolf-psi.vercel.app/imagen/${image}`
      );
      const data = await res;
      console.log(data)
      return data;
}