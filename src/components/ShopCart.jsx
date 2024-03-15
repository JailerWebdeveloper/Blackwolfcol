import { useStore } from '@nanostores/react';
import { cartItems,getCartItems } from '../services/Store';

const ShopCart = () => {
    const $cartItems = useStore(cartItems);
    const useCartitems = getCartItems();
    console.log(useCartitems)
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              className="w-6 h-6 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div
          tabindex="0"
          className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
          {Object.values($cartItems).length ? (
        <ul>
          {Object.values($cartItems).map(cartItem => (
            <li>
                <p>{cartItem.nombre}</p>
                <p>{cartItem.quantity}</p>
            </li>
          ))}
        </ul>
      ) : <p>¡Tu carrito está vacío!</p>}
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCart;
