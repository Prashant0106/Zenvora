import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import '../styles/Products.css'


function Products() {

  const { cartItems, addToCart } = useContext(CartContext)
  console.log("Cart items:", cartItems)
  console.log("Add to cart function:", addToCart)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products')

        setProducts(response.data.products || [])
      } catch (err) {
        setError('Failed to load products. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()

  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  if (loading) {
    return (
      <div className='products-message'>
        <h2>Loading products...</h2>
      </div>
    )
  }
  if (error) {
    return (
      <div className='products-message'>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main className='products-page'>
      <section className='products-header'>
        <span className='products-tagline'>
          THE ZENVORA COLLECTION
        </span>
        <h1>Explore Our Products</h1>
        <p>Discover products you'll love, all in one place.</p>
      </section>

      <section className='product-search-section'>
        <div className='product-search-box'>
          <span>🔍</span>

          <input type='text' placeholder='Search products by name...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          {searchTerm && (
            <button onClick={()=> setSearchTerm('')}>Clear</button>
          )}
        </div>
      </section>

      <section className='products-container'>
        {filteredProducts.length === 0 ? (
          <div className='empty-products'>
            <h2>No products available</h2>
            <p>{searchTerm ? `No products match "${searchTerm}". Try another search.` : "We're getting our collection ready. Check back soon!"}</p>
          </div>
        ) : (
          <div className='products-grid'>

            {filteredProducts.map((product) => {

              // Find this product in the cart
              const cartItem = cartItems.find(
                (item) => item._id === product._id
              );

              // Get its current cart quantity
              const quantityInCart = cartItem?.quantity || 0;

              return (
                <article className='product-card' key={product._id}>

                  <div className='product-image'>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className='product-image-placeholder'>
                        <span>🛍️</span>
                      </div>
                    )}
                  </div>

                  <div className='product-info'>
                    <span className='product-category'>
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p className='product-description'>
                      {product.description}
                    </p>

                    <div className='product-bottom'>
                      <span className='product-price'>
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                      <span className={
                        product.stock > 0
                          ? "stock-available"
                          : "stock-unavailable"
                      }>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* <button
                      className='add-to-cart-btn'
                      disabled={
                        product.stock <= 0 ||
                        quantityInCart >= product.stock
                      }
                      onClick={() => addToCart(product)}
                    >
                      {product.stock <= 0
                        ? "Out of Stock"
                        : quantityInCart >= product.stock
                          ? "Stock Limit Reached"
                          : "Add to Cart"}
                    </button> */}
                    <button
                      className='add-to-cart-btn'
                      disabled={
                        product.stock <= 0 ||
                        quantityInCart >= product.stock
                      }
                      onClick={() => {
                        console.log("Clicked product:", product.name)

                        addToCart(product)

                        console.log("Add to cart function executed")
                      }}
                    >
                      {product.stock <= 0
                        ? "Out of Stock"
                        : quantityInCart >= product.stock
                          ? "Stock Limit Reached"
                          : quantityInCart > 0
                            ? `Added - Qty: ${quantityInCart}`
                            : "Add to Cart"}
                    </button>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  )
}

export default Products
