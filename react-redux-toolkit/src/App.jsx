import { useState } from 'react'
import './App.css'
import PizzaView from './features/pizza/pizzaView';
import BurgerView from './features/burger/burgerView';
import ProductsView from './features/products/ProductsView';

function App() {
  return (
    <>
      <PizzaView></PizzaView>
      <BurgerView></BurgerView>
      <ProductsView></ProductsView>
    </>
  )
}

export default App;
