import Scores from "./Scores";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import { shuffleArray } from "../utils";

const Content = () => {
  const CARD_AMOUNT = 12;
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  async function fetchData(num) {
    const cardsData = [];

    for (let i = 1; i <= num; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();

      const dataID = data.id;
      const dataName = data.name;
      const dataImage = data.sprites.front_default;

      cardsData.push({ dataID, dataName, dataImage });
    }

    return cardsData;
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

    setCards(shuffleArray(cards));
  }

  useEffect(() => {
    console.log("hello");
    const loadData = async () => {
      setCards(shuffleArray(await fetchData(CARD_AMOUNT)));
    };

    loadData();
  }, []);

  return (
    <div className="content-box">
      <Scores />
      <Cards cards={cards} clickHandler={handleClicks} />
    </div>
  );
};

export default Content;
