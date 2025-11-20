"use client";
import { motion } from "framer-motion";

export default function Animated404() {
  return (
    <motion.h1
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
      className="text-3xl font-bold text-red-600"
    >
      404 | غير موجود
    </motion.h1>
  );
}
