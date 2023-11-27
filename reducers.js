const initialState = {
    products: [
      // Sample product data
      { id: 1, name: 'Product 1', thumbnail: 'image1.jpg', price: 10, description: 'Description 1' },
      { id: 2, name: 'Product 2', thumbnail: 'image2.jpg', price: 20, description: 'Description 2' },
      // Add more
    ],
    cart: [],
    favorites: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return { ...state, cart: [...state.cart, action.payload] };
  
      case 'ADD_TO_FAVORITES':
        return { ...state, favorites: [...state.favorites, action.payload] };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;