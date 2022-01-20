import axios from 'axios';
import { useState, useEffect } from 'react';

const useWriting = () => {

  const [data, setData] = useState([]);

  const fetchWriting = async (usecaseId) => {

    const response = await axios.get("/writing?usecaseId=" + usecaseId);
    const data = response.data
    console.log(data);
    return data;
  }

  const addWriting = async () => {
    const response = await axios.post("/exercise/next");
    const data = response.data
    setData({
      word: data.word.spelling,
      description: data.usecase.description,
      examples: data.examples.map(example => example.sentence)
    });
  }

  useEffect(() => {
    fetchWriting();
  }, [])

  return [data, addWriting];
}

export default useWriting;