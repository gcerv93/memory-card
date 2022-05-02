import { useState, useEffect } from "react";
import Card from "./Card";

const Cards = () => {
  const CARD_AMOUNT = 12;
  const [displays, setDisplays] = useState([]);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  async function fetchData(num) {
    const displayData = [];

    for (let i = 1; i <= num; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();

      const dataID = data.id;
      const dataName = data.name;
      const dataImage = data.sprites.front_default;

      displayData.push({ dataID, dataName, dataImage });
    }

    return displayData;
  }

  useEffect(() => {
    console.log("hello");
    const loadData = async () => {
      setDisplays(shuffleArray(await fetchData(CARD_AMOUNT)));
    };

    loadData();
  }, []);

  return (
    <div className="cards">
      {displays.length > 0
        ? displays.map((info) => (
            <Card
              key={info.dataID}
              id={info.dataID}
              name={info.dataName}
              image={info.dataImage}
            />
          ))
        : null}
    </div>
  );
};

export default Cards;
