import { createContext, useState } from 'react'
import PropTypes from 'prop-types';

// Este es el que tenemos que consumir
export const FiltersContext = createContext()

// Este es el que nos provee de acceso al contexto
export default function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 250
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};