const Scores = (props) => {
  return (
    <div className="scores">
      <div className="currScore">
        <p>Current Score: {props.currentScore}</p>
      </div>
      <div className="bestScore">
        <p>Best Score: {props.bestScore}</p>
      </div>
    </div>
  );
};

export default Scores;
