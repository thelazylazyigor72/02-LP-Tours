import React from 'react';
import Tour from './Tour';

//just for note: i'm using destucturization when getting parameters
//yes i could make const tours = props.tours inside component, but what we doing now is more efficient

//so nothing interesting just renderin list of parameters via map method and setting keys
//to mention inside map method we returnin components, passin in data bout single tour and also settin a key
//aslo passing removeTour method that we get from App right to Tour
const Tours = ({tours,removeTour}) => {
  return (
    <section>
      <div className='title'>
        <h2>our tours</h2>
        <div className='underline'></div>
      </div>
      <div>
        {tours.map( tour => {
          return <Tour removeTour={removeTour} key={tour.id} tour={tour} />
        })}
      </div>
    </section>
  )
};

export default Tours;
