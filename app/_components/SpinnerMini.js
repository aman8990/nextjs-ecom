function SpinnerMini({ size = 28 }) {
  return (
    <div
      className="spinner-mini"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
}

export default SpinnerMini;
