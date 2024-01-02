import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJNZ2JNWU9mS2dmemZyTzZ4STZWdXY4eVVncGV5c2lxcENkd1d3azRNdnZ1b0o1U1hSeiIsImp0aSI6IjdmMTRhZDNiMjEwMTNmM2FkYjNhNTg0NmE0YmU3ZjRkZmE1YzExZWFmNzE1NDM3OTIyMDVlODc0MTkyZWYwOGZjYzU4ZmNjMDA2ODBjOTIyIiwiaWF0IjoxNzA0MjI2OTk2LCJuYmYiOjE3MDQyMjY5OTYsImV4cCI6MTcwNDIzMDU5Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.vZNnxQbwsc4qrZ3fTsrA_Qo6jZJoOfH0I90H4f26gYE3ifiRdEq73KdDqwmIberTE4gL33DDS4rG8iTGUscDvLCewQltyRp_l2iq95xkDcjTX8cYhSrsyEkBZ5Vi7HFUgKjgbFxsVMq-k65mXCpB2u6LJ11i0eunuHj26qDuYbpZRGZQwYynVYNvbtnnReIfxkV4SdD9e5YtfHlHgrvUrdYLYdqD81Ajp5l4ERdaaJQIpnhwbyW5PkSa4cEFBKHZ2wGRF2tUZtIgLpzhAOqHGdElVSDTfFVGWUPCtz0DnJPl0wm9lKyIDFBEYztCuW3n5X3_b6WI9tp4a1fw0WQYHA";

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
          <img src={animal.Picture}></img>
        </div>
      ))}
    </div>
  );
}

export default App;
