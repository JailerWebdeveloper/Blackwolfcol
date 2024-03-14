// cartStore.js
import { atom, map } from 'nanostores'

export const cartItems = map({})

export function addCartItem({ id, quantity }) {
  const existingEntry = cartItems.get()[id]
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + quantity,
    })
  } else {
    cartItems.setKey(
      id,
      { id, quantity }
      
    )
  }
  console.log(cartItems);

}