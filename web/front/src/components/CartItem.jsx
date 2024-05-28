import { useRef, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";

import "./CartItem.css";

export function CartItem({ book, cart, setCart }) {
  const [isValid, setValidationStatus] = useState(true);
  const quantityInput = useRef(null);

  const updateQuantity = (id) => {
    const quantity = parseInt(quantityInput.current.value);
    if (quantity > 100 || quantity < 1) {
      setValidationStatus(false);
      return;
    }
    setValidationStatus(true);
    setCart(
      cart.map((b) => {
        if (b.id === id) {
          return { ...b, quantity };
        }
        return b;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((b) => b.id !== id));
  };

  return (
    <div className="cartItem" key={book.id}>
      <div className="cartItemHeader">
        <h3>{book.title}</h3>
        <button onClick={() => removeFromCart(book.id)}>X</button>
      </div>
      <p>
        Price: {`${book.listedPrice.currencyCode} ${book.listedPrice.amount}`}
      </p>
      <div style={{ display: "flex" }}>
        <p>Quantity:</p>
        <input type="number" defaultValue={book.quantity} ref={quantityInput} />
      </div>
      <button onClick={() => updateQuantity(book.id)}>Update quantity</button>
      <p className={cs("validationTip", { valid: isValid })}>
        Sorry! Number invalid
      </p>
    </div>
  );
}

CartItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    pageCount: PropTypes.number,
    listedPrice: PropTypes.shape({
      currencyCode: PropTypes.string,
      amount: PropTypes.number,
    }),
    quantity: PropTypes.number,
  }),
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
