import Card from '../card/card'
import styles from './card-list.module.css'
import { useDispatch } from 'react-redux';
import { OPEN_INGREDIENT } from '../../services/actions/ingredientDetailsModal';

export default function CardList({name, title, ingredients, refTarget}) {
  const dispatch = useDispatch();

  const handleOpenModal = (e, ingredient) => {
    dispatch({
      type: OPEN_INGREDIENT,
      ingredient: ingredient
    })
  }

  return (
    <>
      <h2 className={`text text_type_main-medium mt-10 ${title}-title`}>{name}</h2>
      <div className={styles.list} ref={refTarget}>
        {ingredients.map((ingredient) => {
          return(
            <Card
              key={ingredient._id}
              ingredient={ingredient}
              onCardClick={(e) => handleOpenModal(e, ingredient)}
            />
          )
        })}
      </div>
    </>
  )
}