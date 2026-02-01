import React, { useState, useEffect } from "react";

const CsvErrorPanel = ({ uploadProgress }) => {
  const [visible, setVisible] = useState(true);

  // Reset visibility whenever a new FAILURE uploadProgress comes in
  useEffect(() => {
    if (uploadProgress?.status === "FAILURE") {
      setVisible(true);
    }
  }, [uploadProgress]);

  if (!uploadProgress || uploadProgress.status !== "FAILURE" || !visible)
    return null;

  const errors = uploadProgress.errors || [];

  return (
    <div className="relative  bottom-0.5  z-50 left-1/2 transform -translate-x-1/2 w-full z-40 rounded-lg flex flex-col">
      {/* Header with close button */}
      <div className=" border-red-300 bg-red-300 shadow-md m-2 rounded">
        <div className="top-0 z-10 bg-red-400 px-4 rounded-t flex justify-between items-center border-b  border-red-300">
          <span className="font-semibold text-red-700">
            CSV Import Errors ({errors.length})
          </span>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="text-red-700 font-bold text-lg hover:text-red-900"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 max-h-[100px] overflow-y-auto p-3 space-y-2">
          {errors.length === 0 ? (
            <div className="text-gray-600">No errors found.</div>
          ) : (
            errors.map((err, idx) => (
              <div
                key={idx}
                className="flex justify-between rounded-md bg-white border border-red-200 px-3 py-2 text-sm text-red-600"
              >
                {err.row && <span>Row {err.row}</span>}
                <span>{err.error}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvErrorPanel;
