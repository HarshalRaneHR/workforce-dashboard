import { motion } from "motion/react";
import type { LoaderProps } from "../types";
import "./css/Loader.css";

const Loader = ({ error }: LoaderProps) => {
  return (
    <div className="loader">
      <div className="loader-inner">
        <motion.div
          className="loader-mark"
          initial={{ opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 1, letterSpacing: "0.16em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="loader-glyph">◈</span> XYZ
        </motion.div>
        <div className="loader-sub">Workforce Dashboard</div>

        {error ? (
          <div className="loader-error" role="alert">
            <span className="loader-error-title">Couldn’t load data</span>
            <span className="loader-error-msg">{error}</span>
            <button
              className="loader-retry"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="loader-bar">
              <span className="loader-bar-fill" />
            </div>
          </>
        )}
      </div>
      <div className="loader-grain" />
    </div>
  );
};

export default Loader;
