import axios from 'axios';
import { useState, useEffect } from 'react';

const useExercise = () => {

  const [exercise, setExercise] = useState({ currentUsecase: 0, word: "", description: "", examples: [] });
  const [writing, setWriting] = useState([]);


  const fetchExercise = async () => {

    const response = await axios.get("/exercise");
    const data = response.data
    setExercise({
      currentUsecase: data.usecase.id,
      word: data.word.spelling,
      description: data.usecase.description,
      examples: data.examples.map(example => example.sentence)
    });
    return data;
  }

  const fetchNextExercise = async () => {
    const response = await axios.post("/exercise/next");
    const data = response.data
    setExercise({
      currentUsecase: data.usecase.id,
      word: data.word.spelling,
      description: data.usecase.description,
      examples: data.examples.map(example => example.sentence)
    });
  }

  const fetchWriting = async () => {
    console.log("hihi")
    const response = await axios.get("/writing?usecaseId=" + exercise.currentUsecase);
    const data = response.data
    console.log(data);
    return data;
  }

  const addWriting = async () => {
    const response = await axios.post("/writing?usecaseId=" + exercise.currentUsecase);
    const data = response.data
    console.log(data);
    /*
    setWriting({
      word: data.word.spelling,
      description: data.usecase.description,
      examples: data.examples.map(example => example.sentence)
    });
    */
  }

  useEffect(() => {
    fetchExercise();
    fetchWriting();
  }, [])

  return [exercise, fetchNextExercise, addWriting];
}

export default useExercise;