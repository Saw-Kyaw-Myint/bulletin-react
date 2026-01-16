import { AlertTriangle } from "lucide-react";

const ConfirmModel = ({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-md w-full mx-4">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

            <p className="text-purple-200 mb-4">{description}</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 cursor-pointer text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModel;
