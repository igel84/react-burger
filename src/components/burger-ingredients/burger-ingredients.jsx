import { useState, useRef, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import burgerIngredients from './burger-ingredients.module.css'
import CardList from '../card-list/card-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { CLOSE_INGREDIENT } from '../../services/actions/ingredientDetailsModal';

function BurgerIngredients() {
  const refBuns = useRef()
  const refMain = useRef()
  const refSauc = useRef()

  const dispatch = useDispatch();

  const ingredients = useSelector(store => store.ingredients.ingredients)
  const currentIngredient = useSelector(store => store.ingredientDetailsModal.currentIngredient)
  const isIngredientOpen = useSelector(store => store.ingredientDetailsModal.isIngredientOpen)

  const { buns, mains, sauces } = useMemo(() => {
    return {
      buns: ingredients.filter(item => item.type === 'bun'),
      mains: ingredients.filter(item => item.type === 'main'),
      sauces: ingredients.filter(item => item.type === 'sauce')
    }
  }, [ingredients])

  const [current, setCurrent] = useState('one')
  
  const handleCloseModal = () => {
    dispatch({ type: CLOSE_INGREDIENT })
  }

  const handleNothingModal = (e) => {
    e.stopPropagation();
  }

  const [isBunsInter, setBunsIsInter] = useState(false);
  const [isMainInter, setMainIsInter] = useState(false);
  const [isSaucInter, setSaucIsInter] = useState(false);

  const interChange = (entry, val) => {
    if (val === 'one') {
      setBunsIsInter(entry.isIntersecting);
    } else if (val === 'two') {
      setMainIsInter(entry.isIntersecting);
    } else if (val === 'three') {
      setSaucIsInter(entry.isIntersecting);
    }
  
    if (isBunsInter) {
      setCurrent('one');
    } else if (isSaucInter) {
      setCurrent('three');
    } else if (isMainInter) {
      setCurrent('two');
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {interChange(entry, 'one')});
    observer.observe(refBuns.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [isBunsInter]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {interChange(entry, 'two')});
    observer.observe(refMain.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [isMainInter]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {interChange(entry, 'three')});
    observer.observe(refSauc.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [isSaucInter]);

  return (
    <section className="mr-10">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>Начинки</Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>Соусы</Tab>        
      </div>
        <div className={burgerIngredients.all}>
        {/* <div className={burgerIngredients.all}> */}
          <CardList ingredients={buns}   name="Булки"   title="bun"   refTarget={refBuns} />
          <CardList ingredients={mains}  name="Начинки" title="main"  refTarget={refMain} />
          <CardList ingredients={sauces} name="Соусы"   title="sauce" refTarget={refSauc} />
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