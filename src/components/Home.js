import ProductList from './ProductList';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const productsPerPage = 10;

  // Parse the 'page' parameter from the URL or use 1 as the default page
  const currentPage = parseInt(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    // Calculate the skip value based on the current page
    const skip = (currentPage - 1) * productsPerPage;
    // Construct the API URL based on whether a search query is present
    let apiUrl;
    if (searchQuery) {
      apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(
        searchQuery
      )}&limit=${productsPerPage}&skip=${skip}`;
    } else {
      apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;
    }

    // Fetch product data with pagination
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        // Scroll to the top of the page when new products are loaded
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => {
        setError('An error occurred while fetching product data.');
        console.error(err.message);
      });
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    // Update the URL parameter when the page changes
    navigate(`?page=${newPage}${searchQuery ? `&search=${searchQuery}` : ''}`);
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p className="error">{error}</p>}
      <div className="products-container">
        {products.map(product => (
          <ProductList
            key={product.id}
            title={product.title}
            price={product.price}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
      {products.length >= 10 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button className="btn btn-primary" onClick={() => {handlePageChange(currentPage - 1)}}>Previous</button>
          )}
          <button className="btn btn-primary" onClick={() => {handlePageChange(currentPage + 1)}}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Home;