const ProductList = ({ title, price, discountPercentage, rating, thumbnail }) => {
  return (
    <div className="product">
      <img className="img-fluid" src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Discount: {discountPercentage}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}

export default ProductList;