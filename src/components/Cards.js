import Card from "./Card";

const Cards = (props) => {
  return (
    <div className="cards">
      {props.cards.length > 0
        ? props.cards.map((info, idx) => (
            <Card
              key={idx}
              id={info.dataID}
              name={info.dataName}
              image={info.dataImage}
              clickHandler={props.clickHandler}
            />
          ))
        : null}
    </div>
  );
};

export default Cards;
