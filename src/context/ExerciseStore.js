
import React from 'react';
import useExercise from '../hook/useExercise';

export const ExerciseContext = React.createContext();

const ExerciseStore = (props) => {

  const [exercise, fetchNextExercise] = useExercise()

  return (
    <ExerciseContext.Provider value={{ exercise, fetchNextExercise }}>
      {props.children}
    </ExerciseContext.Provider>
  )
}

export default ExerciseStore;