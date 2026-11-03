import { createContext, useState } from "react";

//Create Context
export const CartContext = createContext()

//Create Provider
export const CartProvider = ({ children }) => {

  //Cart state
  const [cartItems, setCartItems] = useState([])

  //Add product to cart
  const addToCart = (product) => {
    console.log("Adding product:",product.name)

    setCartItems((prevItems) => {

      const existingProduct = prevItems.find(
        (item) => item._id === product._id
      )
      if (existingProduct) {
        return prevItems.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  //Increase product quantity
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => prevItems.map((item)=>item._id ===productId && item.quantity < item.stock ? {...item, quantity: item.quantity + 1} : item
  )
)
  }
  //Decrease product quantity
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>prevItems.map((item)=> item._id === productId ? {...item, quantity : item.quantity -1} : item).filter((item)=> item.quantity > 0))
  }
  //Remove product
  const removeFromCart = (productId) => {
    setCartItems((prevItems)=> prevItems.filter((item)=> item._id !== productId))
  }
  return (
    <CartContext.Provider value={{ cartItems, addToCart,increaseQuantity,decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}