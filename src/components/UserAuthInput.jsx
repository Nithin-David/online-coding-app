import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {motion} from "framer-motion";


const UserAuthInput = ({
  placeholder,
  label,
  isPass,
  Icon,
  setStateFunction,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setValue(newText);
    setStateFunction(newText);

    if (placeholder === "Email here...") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const status = emailRegex.test(value);
      setEmailValid(status);
      setGetEmailValidationStatus(status);
    }
  };

  return (
    <div className="felx flex-col items-start justify-start w-full">
      <label className="text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center w-full md:w-96 bg-gray-200 rounded-md px-4 py-2 gap-2 text-text555 text-lg ${
          !emailValid &&
          value.length > 0 &&
          placeholder === "Email here..." &&
          "border-[2px] border-red-500"
        }`}>
        <Icon className="text-2xl" />
        <input
          value={value}
          onChange={handleTextChange}
          type={isPass && !showPassword ? "password" : "text"}
          className="flex-1 bg-transparent border-none outline-none"
          placeholder={placeholder}
        />
        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer">
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput