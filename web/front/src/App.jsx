import { useEffect, useState } from "react";
import cs from "classnames";
import "./App.css";
import { BookCard } from "./components/BookCard";
import { Header } from "./components/Header";
import { CartItem } from "./components/CartItem";

function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartStatues, setCartStatues] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const addToCart = (book) => {
    if (cart.find((b) => b.id === book.id)) {
      return;
    }
    setCartStatues([...cartStatues, { id: book.id, valid: true }]);
    setCart([...cart, { ...book, quantity: 1 }]);
  };

  return (
    <>
      <Header
        setCartVisible={setCartVisible}
        cartVisible={cartVisible}
        cart={cart}
      />
      <div className="mainPage">
        <div className="cardsList">
          <h2>Book results</h2>
          {books.map((book) => (
            <BookCard book={book} addToCart={addToCart} key={book.id} />
          ))}
        </div>
        <div className={cs("cart", { cartVisible: cartVisible })}>
          <h2>My Cart</h2>
          {cart.map((book) => (
            <CartItem
              book={book}
              cart={cart}
              setCart={setCart}
              cartStatues={cartStatues}
              setCartStatues={setCartStatues}
              key={"cart-" + book.id}
            />
          ))}
          <div style={{ visibility: cart.length > 0 ? "visible" : "hidden" }}>
            <h3>
              Total Price{" "}
              {cart
                .reduce(
                  (sum, curr) => sum + curr.quantity * curr.listedPrice.amount,
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
