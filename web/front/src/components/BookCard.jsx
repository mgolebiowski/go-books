import PropTypes from "prop-types";

import "./BookCard.css";

export function BookCard({ book, addToCart }) {
  return (
    <div className="bookCard">
      <div className="bookImgCol">
        <img src={book.imageUrl} />
      </div>
      <div>
        <h3>{book.title}</h3>
        <p className="cardDescription">{book.description}</p>
        <p>Pages: {book.pageCount}</p>
        {book.listedPrice.currencyCode && (
          <>
            <p>
              Price:{" "}
              {`${book.listedPrice.currencyCode} ${book.listedPrice.amount}`}
            </p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
}

BookCard.propTypes = {
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
  }),
  addToCart: PropTypes.func,
};
