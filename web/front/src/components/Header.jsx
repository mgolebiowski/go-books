import PropTypes from "prop-types";

export function Header({ setCartVisible, cartVisible, cart }) {
  return (
    <>
      <header>
        <h1>ScyllaDB Bookshop</h1>
        <button onClick={() => setCartVisible(!cartVisible)}>My Cart { cart.length > 0 && `(${cart.length})` }</button>
      </header>
      <div className="filters">
        <input type="text" placeholder="Search books" />
      </div>
    </>
  );
}

Header.propTypes = {
  setCartVisible: PropTypes.func,
  cartVisible: PropTypes.bool,
  cart: PropTypes.array,
};
