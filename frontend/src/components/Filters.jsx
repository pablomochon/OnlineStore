import { useState, useEffect } from 'react'
import './Filters.css'
import axios from 'axios';

export function Filters ({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
      <div className='row'>
        <div className='col'>
          <label htmlFor='price'>Price:</label>
          <input
            type='range'
            id='price'
            min='0'
            max='1500'
            className='form-range'
            onChange={handleChangeMinPrice}
          />
        </div>
        <div className='col'>
          <span>${minPrice}</span>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <label htmlFor='category'>Categories</label>
          <select
            id='categoryFilterId'
            className='form-select'
            onChange={handleChangeCategory}
            value={selectedCategory}
          >
            <option value='all'>All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
