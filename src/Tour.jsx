import React, { useState } from 'react';

//setting a tour component
//inside of it just makin tour card skeleton

//also here's pretty cool thing - inplementation of readMore functionality
//to do it we used conditional rendering and useState()

//deconstruct props right in the argument
const Tour = (props) => {
  //set state variable to make readmore functinality, initial - false
  const [readMore, setReadMore] = useState(false)

  //deconstruct props
  const {id, name, info, image, price} = props.tour  
  
  //assign to btn removeTour handler, its all about lifting up state
  return (
    <article className='single-tour'>
      <img src={image} alt={name} />
      <footer className='tour-info'>
        <h4>{name}</h4>
        <h4 className='tour-price'>${price}</h4>
        <p>
          {
            readMore?info:`${info.substring(0,175)}...`
          }
          <button onClick={() => setReadMore(!readMore)}>
            {readMore?'show less':'read more'}
          </button>
        </p>
        <button onClick={() => {props.removeTour(id)}} className='delete-btn'>
          not interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
