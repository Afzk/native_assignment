export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const addToFavorites = (product) => ({
    type: 'ADD_TO_FAVORITES',
    payload: product,
  });