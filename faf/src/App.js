import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { token } from "./Petfinder_API/Key_Generator";
import makeRequest from "./Petfinder_API/Key_Generator";

makeRequest();

function App() {
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");

  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJNZ2JNWU9mS2dmemZyTzZ4STZWdXY4eVVncGV5c2lxcENkd1d3azRNdnZ1b0o1U1hSeiIsImp0aSI6ImIwODFiNTQ5OGQ5ODU0ZmIwNTVkMTYxNjI5ODdiZDViZmQ4NWVmN2NhZWZkNTI0ZmY4OTcxZGQyMjk0OGY4MWYwZTc4Zjc0NjI2ZTNhZTk3IiwiaWF0IjoxNzA0ODI1OTU3LCJuYmYiOjE3MDQ4MjU5NTcsImV4cCI6MTcwNDgyOTU1Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.z3GaQRfJexnXCTlvuTKJ89MOUMw-ieJR5vtPdl0DQdxO04FRt_rdS_qTlxhBxhgtvrEqXvGmsCPzOi3qJomZ5fkyXycvlkJqtzgDCTZVve1oQgDx8vNQOw_copCMdC6E61Rdwr8zS3gpoRzWMxTGVUi5uylfN5tbuKBvEAHK9bbLFuvbaT8gQ8E-woT42bcdJ5gtRw_3b5uhoqEx4FrR_PlN5zwroLg2mpEKndcJ_e3PVfoBj71s5VQlalT4jqfYwkPY5w4AYcrKnEe6JBetG_IEPKNIynQYOaNyw4Ym3QEs_xVyoQdgPR8QL9W5kDkx3q8ijNrpSFn9JORGIlsUSQ";

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    []
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
  }, [selectedAnimal]);
 

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
          <button>Learn More About me!</button>
        </div>
      ))}
    </div>
  );
}

export default App;
