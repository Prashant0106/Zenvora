
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <main className='home-page'>
      {/* Home Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <span className='hero-tagline'>
            DISCOVER YOUR NEXT FAVORITE
          </span>
          <h1>Everything You Need,<span>All in One Place.</span></h1>
          <p>Explore a world of products with Zenvora.
            Discover quality, enjoy great deals, and
            experience shopping made simple.</p>
            <Link to="/products" className="shop-now-btn">
            Shop Now
            </Link>
        </div>
        <div className='hero-visual'>
          <div className='hero-circle'>
            <span>Z</span>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className='categories-section'>
        <div className='section-heading'>
          <h2>Shop by Category</h2>
          <p>Explore products across different categories</p>
        </div>

        <div className='category-grid'>

          <div className='category-card'>
            <span>📱</span>
            <h3>Electronics</h3>
          </div>

          <div className='category-card'>
            <span>👚</span>
            <h3>Fashion</h3>
          </div>

          <div className='category-card'>
            <span>🏠</span>
            <h3>Home & Living</h3>
          </div>

          <div className='category-card'>
            <span>⌚</span>
            <h3>Accessories</h3>
          </div>
        </div>        
      </section>

      {/* Shopping CTA */}
      <section className='shopping-banner'>
        <h2>Your Shopping Journey Starts Here.</h2>
        <p>Find something you will love at Zenvora.</p>
        <Link to="/products" className="banner-btn">Explore Products</Link>
      </section>

    </main>
  )
}

export default Home
