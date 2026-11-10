
import React from 'react'
import { Link } from 'react-router-dom'
import TrendingProducts from '../components/TrendingProducts'
import WhyChooseUs from '../components/WhyChooseUs'
import Newsletter from '../components/NewsLetter'
import '../styles/Home.css'

function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <span className="hero-tagline">
            DISCOVER THE ZENVORA EXPERIENCE
          </span>

          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover products that complement your lifestyle.
            Explore quality collections, enjoy exciting deals
            and experience shopping made simple.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="shop-now-btn">
              Shop Now <span>→</span>
            </Link>

            <Link to="/products" className="explore-link">
              Explore Collection
            </Link>
          </div>

          <div className="hero-note">
            <span>✓</span>
            Your everyday shopping destination
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="/hero.png"
              alt="Explore the Zenvora collection"
            />
          </div>

          <div className="hero-floating-card">
            <span>✦</span>
            <div>
              <strong>Discover More</strong>
              <small>Something for everyone</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}

      <section className="categories-section">
        <div className="section-heading">
          {/* <span className='section-tagline'>
            EXPLORE OUR COLLECTIONS
          </span> */}
          <h2>Shop by Category</h2>
          <p>Find everything you need, all in one place.</p>
        </div>

        <div className="category-grid">
          <Link to="/products" className='category-card'>
          <img src='/categories/electronics.png' alt='Electronics' />
          
          <div className='category-overlay'>
          <div>
            <h3>Electronics</h3>
            <span>Explore Collection</span>
          </div>
          <span className='category-arrow'>→</span>
          </div>
          </Link>

          {/* <div className="category-card">
            <span>📱</span>
            <h3>Electronics</h3>
          </div> */}
          <Link to='/products' className='category-card'>
          <img src='/categories/fashion.png' alt='Fashion' />
          <div className='category-overlay'>
            <div>
              <h3>Fashion</h3>
              <span>Explore Collection</span>
            </div>
            <span className='category-arrow'>→</span>
          </div>
          </Link>

          {/* <div className="category-card">
            <span>👚</span>
            <h3>Fashion</h3>
          </div> */}
          <Link to='/products' className='category-card'>
          <img src='/categories/home.png' alt='Home and Living' />
          <div className='category-overlay'>
            <div>
              <h3>Home & Living</h3>
              <span>Explore Collection</span>
            </div>
            <span className='category-arrow'>→</span>
          </div>
          </Link>

          {/* <div className="category-card">
            <span>🏠</span>
            <h3>Home & Living</h3>
          </div> */}

          <Link to='/products' className='category-card'>
          <img src='/categories/accessories.png' alt='Accessories' />
          <div className='category-overlay'>
            <div>
              <h3>Accessories</h3>
              <span>Explore Collection</span>
            </div>
            <span className='category-arrow'>→</span>
          </div>
          </Link>

        </div>
      </section>

      {/* Trending Products */}
      <TrendingProducts />

      {/* Why Choose Zenvora */}
      <WhyChooseUs />

      {/* Shopping CTA */}
      <section className="shopping-banner">
        <h2>Your Shopping Journey Starts Here.</h2>
        <p>Find something you will love at Zenvora.</p>

        <Link to="/products" className="banner-btn">
          Explore Products
        </Link>
      </section>


    </main>
  )
}

export default Home
