import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function EmergencyAlert({ emv }) {
  return (
    <AnimatePresence>
      {emv?.present && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="mb-4"
        >
          <div className="rounded-xl bg-red-50 border border-red-100 p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl"></div>
              <div>
                <div className="font-semibold">Emergency Vehicle Detected</div>
                <div className="text-sm text-gray-600">
                  {emv.type} at {emv.lane}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Auto preemption active</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmergencyAlert;
