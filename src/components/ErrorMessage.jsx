const ErrorMessage = ({ message }) => {
  return message ? (
    <p className="text-red-500 text-sm font-bold mt-1 ml-4 italic">{message}</p>
  ) : null;
};

export default ErrorMessage;
