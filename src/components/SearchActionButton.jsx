import { RefreshCw, Search } from "lucide-react";

const SearchActionButtons = ({
  onReset,
  onSubmit,
  resetIcon: ResetIcon = RefreshCw,
  submitIcon: SubmitIcon = Search,
  resetType = "button",
  submitType = "submit",
}) => {
  return (
    <div className="flex items-end space-x-2">
      <button
        type={resetType}
        onClick={onReset}
        className="px-4 py-3 bg-white/10 cursor-pointer hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center w-full"
      >
        <ResetIcon size={16} />
      </button>

      <button
        type={submitType}
        onClick={onSubmit}
        className="px-4 py-3 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 w-full flex items-center justify-center"
      >
        <SubmitIcon size={16} />
      </button>
    </div>
  );
};

export default SearchActionButtons;
