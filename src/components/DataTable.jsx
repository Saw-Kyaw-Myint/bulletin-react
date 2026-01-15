import { motion } from "framer-motion";

const DataTable = ({
  headers,
  data,
  renderRow,
  selectAll,
  onSelectAll,
  emptyState,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* TABLE HEADER */}
          <thead className="bg-white/5 backdrop-blur-lg">
            <tr className="border-b border-white/20">
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/30 rounded"
                />
              </th>

              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-white font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${
                  index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                } border-b border-white/10 hover:bg-white/10 transition-colors`}
              >
                {renderRow(item)}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && emptyState}
    </div>
  );
};

export default DataTable;
