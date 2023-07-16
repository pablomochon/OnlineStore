import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { useCart } from '../hook/useCart';

export const Products = ({products}) => {
  const { addToCart, cart, RemoveFromCart } = useCart()

  const checkProductInCart = product =>  {
    return cart.some(item => item.id === product.id) //true or false
  }

  return (
    <div className="container products">
      <ul>
      {products.map(product => {
        const isProductInCart = checkProductInCart(product)

        return (
          <li key={product.id}>
            <img src="https://i.dummyjson.com/data/products/6/thumbnail.png" alt={product.name} />
            <div>
              <strong>{product.name}</strong> - ${product.price}
            </div>
            <div>
              {product.brand}
            </div>
            <div>
              {product.description}
            </div>
            <div>
              stock: {product.stock} - volume: {product.volume}
            </div>
            <div>
              category: {product.category.name}
            </div>
            <div>
              <button style={ {backgroundColor: isProductInCart ? 'red' : '#09f'}}
              onClick={() => isProductInCart ? RemoveFromCart(product) : addToCart(product)}>
                {
                  isProductInCart ?
                  <RemoveFromCartIcon /> : 
                  <AddToCartIcon />
                }
              </button>
            </div>

          </li>
          )
        })}
      </ul>
    
    </div>
  );
};

export default Products;