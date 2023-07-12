import './Products.css'

// eslint-disable-next-line react/prop-types
export const Products = ({ products }) => {
  return (
    <main className="container products">
      <ul>
        {Array.isArray(products) ? (products.map(p => {

          return(
            <li key={p.id}>
              <img 
              src=""
              alt={p.name} />
              <div>
                <strong>{p.name}</strong> - ${p.price}
              </div>
              <div>
                {p.brand}
              </div>
              <div>
                {p.description}
              </div>
              <div>
                volume: {p.volume} - weight: {p.weight}
              </div>
              <div>
              stock: {p.stock}
              </div>
              <div>
                <button>add</button>
              </div>
            </li>
          )
        })) : <p> no data avaible</p>}
      </ul>
    </main>
  );
};

export default Products;