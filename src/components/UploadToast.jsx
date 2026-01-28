import { motion } from "framer-motion";
import { X, CheckCircle, XCircle, FileSpreadsheet } from "lucide-react";

const UploadStatusIcon = ({ status, finishUpload }) => {
  let bgColor, Icon;
  if (status === "SUCCESS") {
    bgColor = "bg-green-500/20";
    Icon = <CheckCircle className="w-5 h-5 text-green-400" />;
  } else if (status === "FAILURE") {
    bgColor = "bg-red-500/20";
    Icon = <XCircle className="w-5 h-5 text-red-400" />;
  } else {
    bgColor = "bg-purple-500/20";
    Icon = !finishUpload && (
      <FileSpreadsheet className="w-5 h-5 text-purple-400" />
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}
    >
      {Icon}
    </div>
  );
};

const UploadProgressBar = ({ progress, status }) => {
  let barColor =
    status === "SUCCESS"
      ? "bg-green-500"
      : status === "FAILURE"
        ? "bg-red-500"
        : "bg-purple-500";

  return (
    <div className="w-full bg-white/20 rounded-full h-2.5">
      <motion.div
        className={`h-2.5 rounded-full ${barColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress ?? 0}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const UploadToast = ({ uploadProgress, finishUpload, setTaskId }) => {
  const statusText =
    uploadProgress?.status === "SUCCESS"
      ? "Success"
      : uploadProgress?.status === "FAILURE"
        ? "Failure"
        : "Uploading";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-2xl"
    >
      <button
        onClick={() => setTaskId(null)}
        className="float-end bg-white/15 cursor-pointer text-gray-700 hover:text-white -mt-3 -mr-3 rounded-full p-1"
      >
        <X className="w-3 h-3" />
      </button>

      <div className="flex items-center space-x-4 min-w-96">
        <UploadStatusIcon
          status={uploadProgress?.status}
          finishUpload={finishUpload}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">{statusText}</span>
            <span className="text-purple-200 text-xs font-medium">
              {Math.round(uploadProgress?.progress ?? 0)}%
            </span>
          </div>
          <UploadProgressBar
            progress={uploadProgress?.progress}
            status={uploadProgress?.status}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UploadToast;
