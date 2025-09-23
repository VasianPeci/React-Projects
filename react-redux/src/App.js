import './App.css';
import PizzaBox from './components/PizzaBox';
import BurgerBox from './components/BurgerBox';
import CustomerChoice from './components/CustomerChoice';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import ProductsContainer from './components/ProductsContainer';

function App() {
  return (
    <Provider store={store}>
      <PizzaBox></PizzaBox>
      <BurgerBox></BurgerBox>
      <CustomerChoice></CustomerChoice>
      <ProductsContainer></ProductsContainer>
    </Provider>
  );
}

export default App;
