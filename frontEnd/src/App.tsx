import { useState } from 'react'
import './App.css'
import ProductListItem from './Components/ProductListItemComponent/ProductListItemComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductListItem></ProductListItem>
    </>
  )
}

export default App
