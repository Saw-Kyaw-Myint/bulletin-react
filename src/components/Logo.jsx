import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const Logo = ({ className }) => {
  return (
    <div className={cn("text-center", className)}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center mb-4"
      >
        <img src="/images/logo.png" alt="logo" />
      </motion.div>
    </div>
  );
};

export default Logo;
