import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import '../styles/Cart.css'

function Cart() {

  const {
    cartItems, increaseQuantity, decreaseQuantity, removeFromCart
  } = useContext(CartContext)

  const totalAmount = cartItems.reduce(
    (total,item) => total + item.price * item.quantity, 0
  )
  if(cartItems.length === 0){
    return(
      <main className='cart-page'>
        <div className='empty-cart'>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added anything yet.</p>
        </div>
      </main>
    )
  }
  return (
    <main className='cart-page'>
      <h1>My Shopping Cart</h1>

      <div className='cart-layout'>
        <section className='cart-items'>
          {cartItems.map((item) =>(
            <article className='cart-item' key={item._id}>

              <div className='cart-image'>
                {item.image ? (
                  <img src= {item.image} alt={item.name} />
                ) : (
                    <span>🛍️</span>
                )}
              </div>

              <div className='cart-item-details'>
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString("en-IN")}</p>

                <div className='quantity-controls'>
                <button onClick={()=> decreaseQuantity(item._id)}>
                -
                </button>
                <span>{item.quantity}</span>

                <button disabled={item.quantity >= item.stock} onClick={() => increaseQuantity(item._id)}>
                  +
                </button>
                </div>
                <button className='remove-btn' onClick={()=> removeFromCart(item._id)}>
                Remove
                </button>
              </div>

              <strong>₹{(item.price*item.quantity).toLocaleString("en-IN")}</strong>
            </article>
          ))}
        </section>
        <aside className='cart-summary'>
          <h2>Order Summary</h2>

          <div className='summary-row'>
            <span>Total Items</span>
            <span>{cartItems.reduce((total, item) => + item.quantity, 0)}</span>
          </div>

          <div className='summary-row'>
          <span>Subtotal</span>
          <strong>
            ₹{totalAmount.toLocaleString("en-IN")}
          </strong>
          </div>

          <div className='summary-total'>
          <span>Total Amount</span>
          <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
          </div>

          <button className='checkout-btn'>
          Proceed to Checkout
          </button>
        </aside>

      </div>
    </main>
  )
}

export default Cart
