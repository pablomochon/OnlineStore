import './Cart.css'

import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'


export function Cart () {
    const cartCheckboxId = useId()
  
    return (
      <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
          <CartIcon />
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
  
        <aside className='cart'>
          <ul>
            <li>
                <img 
                src="https://i.dummyjson.com/data/products/2/1.jpg" 
                alt="Iphone" 
                />
                <div>
                    <strong>Ihpone</strong> - $5
                </div>
            </li>

            <footer>
                <small>
                    qty: 1
                </small>
                <button>+</button>
            </footer>
          </ul>
  
          <button>
            <ClearCartIcon />
          </button>
        </aside>
      </>
    )
  }