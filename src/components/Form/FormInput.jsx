const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg
                   text-white placeholder-purple-200 focus:outline-none focus:ring-2
                   focus:ring-purple-400 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
};

export default FormInput;
