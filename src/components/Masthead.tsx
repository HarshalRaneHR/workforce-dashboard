import { motion } from "motion/react";
import { reveal } from "../lib/animations";
import "./css/Masthead.css";

const Masthead = () => {
  return (
    <header className="masthead">
      <motion.div className="brand" {...reveal(-14, 0.05)}>
        <span className="brand-mark">◈</span>
        <span className="brand-name">XYZ</span>
        <span className="brand-sub">Workforce Dashboard</span>
      </motion.div>
    </header>
  );
};

export default Masthead;
