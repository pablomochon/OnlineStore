import './Products.css'

export const Products = ({products}) => {
  console.log(products, "==> products.jsx")
  return (
    <div className="container products">
      <ul>
      {products.map(product => (
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

          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default Products;