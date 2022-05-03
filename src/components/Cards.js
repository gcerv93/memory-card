import { useState, useEffect } from "react";
import Card from "./Card";

const Cards = () => {
  const CARD_AMOUNT = 12;
  const [displays, setDisplays] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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

  function handleClicks(id) {
    if (clicked.indexOf(id) === -1) {
      setClicked(clicked.concat(id));
      setCurrentScore((prevScore) => prevScore + 1);
      if (currentScore >= bestScore) {
        setBestScore((prevScore) => prevScore + 1);
      }
    } else {
      setClicked([]);
      setCurrentScore(0);
      setBestScore((prevScore) => prevScore);
    }

    setDisplays(shuffleArray(displays));
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
        ? displays.map((info, idx) => (
            <Card
              key={idx}
              id={info.dataID}
              name={info.dataName}
              image={info.dataImage}
              clickHandler={handleClicks}
            />
          ))
        : null}
    </div>
  );
};

export default Cards;
