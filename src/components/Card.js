const Card = (props) => {
  return (
    <div className="card" id={props.id}>
      <img src={props.image} alt={props.name} width="160px" height="160px" />
      <div className="cardName">{props.name.toUpperCase()}</div>
    </div>
  );
};

export default Card;
