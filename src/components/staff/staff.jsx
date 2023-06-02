import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { REMOVE_FROM_ORDER, SET_CURRENT_DRAGGING, SET_DRAGGING_POSITION } from '../../services/actions/order'

function Staff({genId, image, name, price}) {
  
  const dispatch = useDispatch();
  const { currentDragging } = useSelector(store => ({
    currentDragging: store.order.currentDragging
  }));

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
      type: REMOVE_FROM_ORDER,
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
  ingredient: PropTypes.object
};

export default Staff