import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen -mt-14">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl"
      >
        <Loader className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  );
};
export default Loading;
