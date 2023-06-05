import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/ingredients'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import style from './app.module.css'

export default function App() {
  const dispatch = useDispatch();

  const ingredients = useSelector(store => store.ingredients.ingredients)
  const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest)
  const ingredientsFailed = useSelector(store => store.ingredients.ingredientsFailed)

  React.useEffect(
    () => {
      dispatch(getIngredients());
    }, 
    [dispatch]
  );

  return (
    <div className="App">
      <AppHeader />
      <main className={style.main}>
        {!ingredientsRequest && !ingredientsFailed && ingredients.lenght !== 0 && 
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        }
      </main>
    </div>
  );
}