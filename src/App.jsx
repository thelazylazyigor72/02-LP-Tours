import React, { useState, useEffect, Fragment } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {
  //set loading state, initial - true
  //so we can use this state to control usage of Loading component
  //its also quite important to assign init to true, so we get ux logic - from the start its loading
  //after loading its data on screen, we can delete the data and then via ui recall data, and when recall see loading
  const [loading, setLoading] = useState(true);

  //set tours variable state where we'll store data dat we get from server and later pass them to components below, initial - empty array
  const [tours, setTours] = useState([]);

  //set up function that removes tour by id
  //then using props we will pass it down to tour component app-tours-tour
  const removeTour = id => {
    //so we filtering tours dat we get from server 
    //and savin only that tours that do not match passed id
    const newTours = tours.filter((tour) => tour.id !== id)
    //change tours state fo see changes in the ui
    setTours(newTours)
  }

  //set up async fetching function to get 'data bout tours'
  const fetchTours = async () => {
    //define trycatch statements too, just in case
    try {
      //make sure that if u !trying to load it will be Loading
      setLoading(true)
      let response = await fetch(url)
      let toursData = await response.json()
      //when we get data from server we want to stop loading and show the data 
      //so stop loadin w/ making state-flag to false, dat will bring us to default return here
      setLoading(false)
      //set data to state variable, we will pass it later to Tours component
      setTours(toursData)
    } catch (error) {
      //even if its error we still stoppin loading
      setLoading(false)
      console.log(error)
    }
  }
  
  //define useEffect, here we makin fetching effect w/ our function
  //also we need it to work just once, when mounting, so we passing 2nd parameter - empty array
  //so when mountin we fetch and other renders will be passed by cuz we not makin any changes in array that we passed
  useEffect(() => {
    fetchTours()
  },[])
  
  //start w/ checkin' a state, when its true
  //we will render loadin idicator on page via Loading component
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  //that statement for the case when we removed all Tours
  //so when all removed we will show new title and button to refresh
  //when we click refresh we want all of our tours to back
  //it's simply just call fetchTours() once again - it will change page to Loading state and after that come up w/ all tours on page again
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>
            No tours left
          </h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  //but as a default return we want to show our Tours
  //def return
  return (
    <main>
      <Tours removeTour={removeTour} tours={tours} />
    </main>
  );
}

export default App
