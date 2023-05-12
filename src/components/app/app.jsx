import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import style from './app.module.css'
import { api } from '../../services/appConst'
import { ConstructorContext } from '../../services/appContext'

export default function App() {
  const [ ingredients, setIngredients ] = React.useState();

  const [state, setState] = React.useState({
    ingredients: null,
    isLoading: true,
    errors: null
  })

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, isLoading: true});
      setIngredients([]);
      try {
        const res = await fetch(`${api}api/ingredients`);
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        const data = await res.json();
        setState({...state, ingredients: data.data, isLoading: false});
        setIngredients(data.data);
      } catch (err) {
        setState({...state, errors: err.message, isLoading: false});
      }
    }

    getIngredientsData();
  // eslint-disable-next-line 
  }, [])

  return (
    <div className="App">
      <ConstructorContext.Provider value={{ingredients}}>
        <AppHeader />
        <main className={style.main}>
          {!state.isLoading && 
            state.errors === null ? <BurgerIngredients ingredients={state.ingredients} /> : state.errors
          }
          {!state.isLoading && 
            state.errors === null ? <BurgerConstructor /> : state.errors
          }
        </main>
      </ConstructorContext.Provider>
    </div>
  );
}