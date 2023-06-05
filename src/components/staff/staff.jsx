import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { REMOVE_FROM_CONSTRUCTOR } from '../../services/actions/burgerConstructor'
import { SET_CURRENT_DRAGGING, SET_DRAGGING_POSITION } from '../../services/actions/burgerConstructor'

function Staff(props) {
  
  const { genId, image, name, price } = props.ingredient

  const dispatch = useDispatch();
  const currentDragging = useSelector(store => store.burgerConstructor.currentDragging)

  const [{isDrag}, dragRef] = useDrag({
    type: "staff",
    item: () => {
      dispatch({
        type: SET_CURRENT_DRAGGING,
        item: genId
      });
      return { genId }
    },
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  const handleClose = (e, genId) => {
    dispatch({
      type: REMOVE_FROM_CONSTRUCTOR,
      item: genId
    })
  }

  const [{isOver}, dropRef] = useDrop({
    accept: "staff",
    drop(itemId) {
      handleDrop(itemId);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  const handleDrop = (itemId) => {
    dispatch({
      type: SET_DRAGGING_POSITION,
      frontId: itemId.genId,
      backId: genId
    });
  };

  return (
    <>
    <div ref={(el)=> {dropRef(el); dragRef(el);}}>
      {!isDrag &&
      <>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={(e) => handleClose(e, genId)}
      />
      </>}
    </div>
    {isOver && 
      <div>
        <DragIcon type="primary" />
        <ConstructorElement
          text={currentDragging.name}
          price={currentDragging.price}
          thumbnail={currentDragging.image}
        />
      </div>
      }
      </>
  )
}

Staff.propTypes = {
  ingredient: PropTypes.shape({
    genId: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  })
};

export default Staff