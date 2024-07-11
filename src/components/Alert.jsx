import React from 'react';
import {motion} from "framer-motion";
import { dropUpandDown } from '../animation';

const Alert = ({alertMsg}) => {
  return (
    <motion.div
      {...dropUpandDown}
      className="flex items-center justify-center fixed top-[100px] right-[85px] z-10 rounded-md">
      {alertMsg === "Saved Successfully..!" && (
        <div className="bg-green-500 border-green-600 shadow-green-400 shadow-md px-2 py-1 rounded-md text-white">
          <p>{alertMsg}</p>
        </div>
      )}
      {alertMsg === "Not Saved..!" && (
        <div className="bg-green-500 border-green-600 shadow-green-400 shadow-md px-2 py-1 rounded-md text-white">
          <p>{alertMsg}</p>
        </div>
      )}
    </motion.div>
  );
}

export default Alert