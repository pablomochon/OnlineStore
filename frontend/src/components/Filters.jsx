import { useState, useEffect } from 'react'
import './Filters.css'
import { fetchCategories } from '../services/category.service';

export function Filters ({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
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
    const value = event.target.value;
    setSelectedCategory(value === 'all' ? 'all' : value);
    changeFilters((prevState) => ({
      ...prevState,
      category: value,
    }));
  }
  return (
<section className='filters mb-5'>
      <div className='row'>
        <div className='col'>
          <label htmlFor='price'></label>
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
        <label htmlFor='category'>Categories:</label>
        <div className='col'>
          <select
            id='categoryFilterId'
            className='form-select'
            onChange={handleChangeCategory}
            value={selectedCategory}
          >
            <option value='all' >All</option>
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
