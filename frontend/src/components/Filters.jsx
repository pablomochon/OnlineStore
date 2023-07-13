import { useState } from 'react'
import './Filters.css'

export function Filters ({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)
  

  const handleChangeMinPrice = (event) => {
    //drop dilling
    setMinPrice(event.target.value)
    changeFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    changeFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }
  return (
    <section className='filters mb-5'>

      <div>
        <label htmlFor='price'>Price:</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1500'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categoría</label>
        <select id='categoryFilterId' onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='Hogar'>Hogar</option>
          <option value='Ropa'>Ropa</option>
          <option value='Electrónica'>Electrónica</option>
        </select>
      </div>

    </section>

  )
}
