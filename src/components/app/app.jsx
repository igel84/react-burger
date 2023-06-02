import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/order'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import style from './app.module.css'

export default function App() {
  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => ({
    ingredients: store.order.ingredients,
    ingredientsRequest: store.order.ingredientsRequest,
    ingredientsFailed: store.order.ingredientsFailed
  }));

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