import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import burgerIngredients from './burger-ingredients.module.css'
import Card from '../card/card'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { 
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT
} from '../../services/actions/order';

function BurgerIngredients() {
  const ref = useRef()

  const dispatch = useDispatch();

  const { 
    ingredients, 
    currentIngredient, 
    isIngredientOpen 
  } = useSelector(store => ({
    ingredients: store.order.ingredients,
    currentIngredient: store.order.currentIngredient,
    isIngredientOpen: store.order.isIngredientOpen,
  }));

  const buns = ingredients.filter(item => item.type === 'bun');
  const mains = ingredients.filter(item => item.type === 'main');
  const sauces = ingredients.filter(item => item.type === 'sauce');

  const [current, setCurrent] = useState('one')
  
  const handleOpenModal = (e, ingredient) => {
    dispatch({
      type: OPEN_INGREDIENT,
      ingredient: ingredient
    })
  }

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_INGREDIENT })
  }

  const handleNothingModal = (e) => {
    e.stopPropagation();
  }

  useEffect(() => {
    const list = ref.current;
    
    list.addEventListener("scroll", (event) => {
      const bunTop = list.querySelector('.bun-title').getBoundingClientRect().top;
      const mainTop = list.querySelector('.main-title').getBoundingClientRect().top;
      const sauceTop = list.querySelector('.sauce-title').getBoundingClientRect().top;

      if (bunTop > 0) {
        setCurrent('one')
      } else if (mainTop > 0 || sauceTop > 500) {
        setCurrent('two')
      } else {
        setCurrent('three')
      }
    });

    return () => {
      list.removeEventListener("scroll", () => {});
    }
  }, [ingredients]);


  return (
    <section className="mr-10">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Начинки
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Соусы
        </Tab>        
      </div>
        <div className={burgerIngredients.all} ref={ref}>
          <h2 className="text text_type_main-medium mt-10 bun-title">Булки</h2>
          <div className={burgerIngredients.list}>
            {buns.map((ingredient) => {
              return(
                <Card
                  key={ingredient._id}
                  ingredient={ingredient}
                  onCardClick={(e) => handleOpenModal(e, ingredient)}
                />
              )
            })}
          </div>
          <h2 className="text text_type_main-medium mt-10 main-title">Начинки</h2>
          <div className={burgerIngredients.list}>
            {mains.map((ingredient) => {
              return(
                <Card
                  key={ingredient._id}
                  ingredient={ingredient}
                  onCardClick={(e) => handleOpenModal(e, ingredient)}
                />
              )
            })}
          </div>
          <h2 className="text text_type_main-medium mt-10 sauce-title">Соусы</h2>
          <div className={burgerIngredients.list}>
            {sauces.map((ingredient) => {
              return(
                <Card
                  key={ingredient._id}
                  ingredient={ingredient}
                  onCardClick={(e) => handleOpenModal(e, ingredient)}
                />
              )
            })}
          </div>
        </div>
      {isIngredientOpen && 
        <Modal header='Детали ингредиента' onNothing={handleNothingModal} onClose={handleCloseModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      }
    </section>
  )
}

export default BurgerIngredients;