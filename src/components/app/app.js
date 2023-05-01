import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import app from './app.module.css'
import data from '../../utils/data.json'
import order from '../../utils/order.json'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={order} />
      </main>
    </div>
  );
}

export default App;
