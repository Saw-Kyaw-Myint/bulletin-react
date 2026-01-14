import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const Logo = ({ className }) => {
  return (
    <div className={cn("text-center h-24", className)}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center h-full"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-auto h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Logo;
