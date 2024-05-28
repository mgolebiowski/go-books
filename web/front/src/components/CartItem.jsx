import PropTypes from "prop-types";

export function CartItem({ book, cart, setCart, cartStatues, setCartStatues}) {

    const updateQuantity = (id, quantity) => {
        if (quantity > 100 || quantity < 1) {
          setCartStatues(
            cartStatues.map((b) => {
              if (b.id === id) {
                return { ...b, valid: false };
              }
              return b;
            })
          );
          return;
        }
        setCartStatues(
          cartStatues.map((b) => {
            if (b.id === id) {
              return { ...b, valid: true };
            }
            return b;
          })
        );
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
        setCartStatues(cartStatues.filter((b) => b.id !== id));
        setCart(cart.filter((b) => b.id !== id));
      };

    return (
        <div className="cartItem" key={book.id}>
              <div className="cartItemHeader">
                <h3>{book.title}</h3>
                <button onClick={() => removeFromCart(book.id)}>X</button>
              </div>
              <p>
                Price:{" "}
                {`${book.listedPrice.currencyCode} ${book.listedPrice.amount}`}
              </p>
              <div style={{ display: "flex" }}>
                <p>Quantity:</p>
                <input
                  type="number"
                  defaultValue={book.quantity}
                  id={book.id + "_quantity"}
                />
              </div>
              <button
                onClick={() =>
                  updateQuantity(
                    book.id,
                    document.getElementById(book.id + "_quantity").value
                  )
                }
              >
                Update quantity
              </button>
              <p
                className="validationTip"
                style={{
                  visibility: cartStatues.find((b) => b.id === book.id).valid
                    ? "hidden"
                    : "visible",
                }}
              >
                Sorry! Number invalid
              </p>
            </div>
    )
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
    cartStatues: PropTypes.array,
    setCartStatues: PropTypes.func,
}
