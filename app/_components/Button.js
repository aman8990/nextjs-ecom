function Button({ children, onClick, type, disabled }) {
  return (
    <button
      className="flex justify-center bg-accent-600 rounded-md p-1 text-lg text-white hover:bg-accent-500 w-full"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
