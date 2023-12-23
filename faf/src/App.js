import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJNZ2JNWU9mS2dmemZyTzZ4STZWdXY4eVVncGV5c2lxcENkd1d3azRNdnZ1b0o1U1hSeiIsImp0aSI6IjY3ZDQyNTBmMmE0OGY1N2YxYmRjNDk0M2IwZTE2MmZjNWQyYzM0OTJjOTcxNjQ0ZTFlZDBlNWM3ZjQ3MWQwZGE4ZmI0MzNiNjFhNWY1YmMxIiwiaWF0IjoxNzAyNzgzOTUzLCJuYmYiOjE3MDI3ODM5NTMsImV4cCI6MTcwMjc4NzU1Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.SRMBNX3FFNUFc4AxgXurCjT5ucZKrkY4G68l04ns7K7T39wEiTuWXfWJOnmMrH3TKQASQgIXOxcmHVeEM9drJsdN3atlsLP0tk6tr85ibaSctnU9fqP2AtGlV3fv86WDOyEt9nsblQp3jLbppc3B-W-0ootJJk8uY5T9Fq_fj1Gakg8udhc515BVB_tmm7p4exf2dCtaFdnHZrnC53G8cofCwb1uYWT4jiOtUFZY2KFTG50lOQp3DVzSDkiNmU74RlMOmusF9H2lzd3AMTUpBcs63KJPmtpX4Gfoz76ZQuFOLpO8C4_q6glqeWFp_KYKQl-mDzfkjAagLJD8UToXPQ";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function catButton() {
    setSelectedAnimal((selectedAnimal) => "cat");
  }

  function dogButton() {
    setSelectedAnimal((selectedAnimal) => "dog");
  }

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          `https://api.petfinder.com/v2/animals?type=${selectedAnimal}&page=1`,
          config
        );

        const animals = response.data.animals;
        const updatedAnimalList = animals.map((animal) => ({
          Name: animal.name,
          Species: animal.species,
          Picture: animal.primary_photo_cropped,
        }));

        setAnimalList(updatedAnimalList);
        console.log(animals);
      } catch (error) {
        console.error(error);
      }
    }

    makeRequest();
  }, [selectedAnimal]);
  // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <button onClick={dogButton}>DOGS</button>
      <button onClick={catButton}>CATS</button>
      {animalList.map((animal, index) => (
        <div key={index}>
          <p>Name: {animal.Name}</p>
          <p>Species: {animal.Species}</p>
          <img>{animal.Picture}</img>
        </div>
      ))}
    </div>
  );
}

export default App;
