import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import '../styles/TrendingProducts.css'

function TrendingProducts() {
  const { cartItems, addToCart } = useContext(CartContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/products'
        )
        setProducts(response.data.products || [])

      } catch (err) {
        console.error('Error fetching trending products:', err)
        setError('Unable to load trending products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

  }, [])

  return (
    <section className='trending-section'>
      <div className='trending-heading'>
        <span className='trending-tagline'>
          OUR POPULAR PICKS
        </span>
        <h2>Trending Products</h2>
        <p>Discover what's popular at Zenvora.</p>
      </div>

      {loading ? (
        <p className="trending-message">Loading products...</p>
      ) : error ? (
        <p className="trending-message">{error}</p>
      ) : products.length === 0 ? (
        <p className="trending-message">
          No products available right now.
        </p>
      ) : (
        <div className="trending-grid">

          {products.slice(0, 4).map((product) => {

            const cartItem = cartItems.find(
              (item) => item._id === product._id
            )
            const quantityInCart = cartItem?.quantity || 0

            return (
              <article
                className="trending-card"
                key={product._id}
              >

                <div className="trending-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <div className="trending-placeholder">
                      🛍️
                    </div>
                  )}
                </div>

                <div className="trending-info">

                  <span className="trending-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="trending-price-row">
                    <strong>
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </strong>

                    <span className={
                      product.stock > 0
                        ? 'trending-in-stock'
                        : 'trending-out-stock'
                    }>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <button
                    className="trending-cart-btn"
                    disabled={
                      product.stock <= 0 ||
                      quantityInCart >= product.stock
                    }
                    onClick={() => addToCart(product)}
                  >
                    {product.stock <= 0
                      ? 'Out of Stock'
                      : quantityInCart >= product.stock
                        ? 'Stock Limit Reached'
                        : quantityInCart > 0
                          ? `Added - Qty: ${quantityInCart}`
                          : 'Add to Cart'}
                  </button>

                </div>
              </article>
            )
          })}

        </div>
      )}

      <div className="trending-footer">
        <Link to="/products" className="view-all-btn">
          View All Products →
        </Link>
      </div>

    </section>
  )
}

export default TrendingProducts
