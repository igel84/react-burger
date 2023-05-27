import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import style from './app.module.css'
import { getIngredients } from '../../utils/burger-api'
import { ConstructorContext, BurgerContext } from '../../services/appContext'

export default function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    isLoading: true,
    errors: null
  })

  React.useEffect(() => {
    getIngredients().then(function(res){
      setState({...state, ingredients: res.data, errors: null, isLoading: false});
    }).catch(function (err) {
      setState({...state, ingredients: [], errors: 'Ошибка при загрузке ингредиентов', isLoading: false});
    })
  // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
        <AppHeader />
        <main className={style.main}>
          {!state.isLoading && 
            state.errors === null 
            ? <>
              <BurgerContext.Provider value={{state}}>
                <BurgerIngredients />
              </BurgerContext.Provider>
              <ConstructorContext.Provider value={{state}}>
                <BurgerConstructor />
              </ConstructorContext.Provider>
              </>
            : state.errors
          }
        </main>
    </div>
  );
}