import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import style from './app.module.css'

export default function App() {
  const [state, setState] = React.useState({
    ingredients: null,
    isLoading: true,
    errors: null
  })

  const api = 'https://norma.nomoreparties.space/'

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, isLoading: true});
      try {
        const res = await fetch(`${api}api/ingredients`);
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        const data = await res.json();
        setState({...state, ingredients: data.data, isLoading: false});
      } catch (err) {
        setState({...state, errors: err.message, isLoading: false});
      }
    }

    getIngredientsData();
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={style.main}>
        {!state.isLoading && 
          state.errors === null ? <BurgerIngredients ingredients={state.ingredients} /> : state.errors
        }
        {!state.isLoading && 
          state.errors === null ? <BurgerConstructor ingredients={state.ingredients} /> : state.errors
        }
      </main>
    </div>
  );
}