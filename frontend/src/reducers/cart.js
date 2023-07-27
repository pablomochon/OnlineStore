export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = action.payload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
          ...state.slice(productInCartIndex + 1)
        ]

        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...action.payload, // product
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = action.payload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      const newState = []
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.DECREASE_QUANTITY: {
      const { id } = action.payload;
      const productInCartIndex = state.findIndex(item => item.id === id);

      if (productInCartIndex >= 0 ) {
        const currentQuantity = state[productInCartIndex].quantity;
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;

        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: newQuantity
          },
          ...state.slice(productInCartIndex + 1)
        ];

        updateLocalStorage(newState);
        return newState;
      }

      // If the product is not in the cart, return the current state
      return state;
    }
    default:
      return state
  }
}
