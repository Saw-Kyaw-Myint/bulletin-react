const FormSelect = ({ label, name, value, onChange, options = [] }) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                   transition-all duration-300 appearance-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-800"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
