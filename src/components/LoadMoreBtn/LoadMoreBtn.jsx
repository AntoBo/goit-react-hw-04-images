const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="Button" type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
