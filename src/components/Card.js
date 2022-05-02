const Card = (props) => {
  return (
    <div className="card" id={props.id}>
      <div>{props.name.toUpperCase()}</div>
      <img src={props.image} alt={props.name} />
    </div>
  );
};

export default Card;
