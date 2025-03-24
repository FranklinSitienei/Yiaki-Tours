// src/components/ui/AnimatedInput.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedInput = ({
  label,
  type = "text",
  placeholder = "",
  className = "",
  maxLength,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={focused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <motion.input
        type={type}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2 transition-all duration-300 
          ${focused ? "border-blue-500 shadow-md" : "border-gray-300"} 
          focus:outline-none`}
      />
      {focused && (
        <motion.div
          layoutId="focus-outline"
          className="absolute inset-0 rounded-xl border-2 border-blue-400 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedInput;
