import Cookies from "js-cookie";

  const getCartFromCookies = () => {
    try {
      const cartCookie = Cookies.get('cart');
      if(cartCookie) return JSON.parse(cartCookie);
      else return [];
    } catch (error) {
      console.error("Error retrieving cart from cookies:", error);
      return null;
    }
  };

  const cart = getCartFromCookies();


const setCartInCookies = (cartItems) => {
  try {
    Cookies.set("cart", JSON.stringify(cartItems), { expires: 4 , path: "/" } ); // Set expiration to 7 days
  } catch (error) {
    console.error("Error storing cart in cookies:", error);
  }
};


  export function handleAddToCart(producto,talla,color,cantidad,id,) 
  {
    if (talla && color && cantidad > 0) {
      const cartItems = getCartFromCookies() || [];
      const existingItem = cartItems.find(
        (item) => item.key === id && item.talla === talla && item.color === color
      );

      if (existingItem) {
        // Update existing item quantity if already in cart
        existingItem.quantity += cantidad;
      } else {
        // Add new item to cart
        cartItems.push({
          key:talla+"_"+color+"_"+id,
          id: id,
          quantity: cantidad,
          talla:talla,
          color:color,
          price: producto.Precio,
          nombre: producto.NombreProducto,
          imagen: producto.Imagen[0],
        });
      }

      setCartInCookies(cartItems);

      // Open modal after adding item to cart
    } else {
      // Handle error or notification for missing selections/quantity
      console.error("Please select color, size, and quantity.");
    }
  };
