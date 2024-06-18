import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "./Petfinder_API/Key_Generator";
import makeRequest from "./Petfinder_API/Key_Generator";

makeRequest();

function App() {
  const navigate = useNavigate();
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const authToken = token;

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [authToken]
  );

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
          Gender: animal.gender,
          Picture: animal.primary_photo_cropped
            ? animal.primary_photo_cropped.small
            : null,
        }));

        setAnimalList(updatedAnimalList);
        console.log(animals);
      } catch (error) {
        console.error(error);
      }
    }

    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnimal, config]);

  const gotToNewPage = () => {
    navigate("/petinfo");
  };

  return (
    <div>
      <button onClick={dogButton}>DOGS</button>
      <button onClick={catButton}>CATS</button>
      {animalList.map((pet, index) => (
        <div key={index}>
          <p>Name: {pet.Name}</p>
          <p>Species: {pet.Species}</p>
          <p>Gender: {pet.Gender}</p>
          <img src={pet.Picture} alt="not found!"></img>
          <button onClick={() => gotToNewPage()}>Learn More About me!</button>
        </div>
      ))}
    </div>
  );
}

export default App;
