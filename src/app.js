import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import app from './app.module.css'
import data from './utils/data.json'

function App() {
  const burger = data.slice(0, 5);
  return (
    <div className="App">
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={burger} />
      </main>
    </div>
  );
}

export default App;
