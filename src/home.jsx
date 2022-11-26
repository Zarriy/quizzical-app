function HomePage(props) {
  return (
    <div className="homepage">
      <h1>Quizzical</h1>
      <p>Test you abilities, become aware of your limitations</p>
      <button onClick={() => props.game()}>Start Game</button>
    </div>
  );
}
export default HomePage;
