import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
import { dropUpandDown } from "../animation";

const UserProfileDetails = () => {
  const user = useSelector((state) => state.user.user);
const [dropdown, setDropdown] = useState(false);

  return (
    <div className="flex items-center justify-center gap-3 relative">
      {/* add profile picture or first letter of the name. */}
      <div className="flex items-center justify-center overflow-hidden bg-emerald-500 rounded-xl w-12 h-12">
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            className="object-cover w-full h-full"
            src={user?.photoURL}
            referrerPolicy="no-referrer"
            alt={user?.displayName}
          />
        ) : (
          <p className="text-lg text-white">{user?.displayName[0]}</p>
        )}
      </div>

      {/* add a dropdown btn for show the profile items. */}
      <motion.div
        onClick={() => setDropdown(!dropdown)}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center px-2 py-4 bg-secondary rounded-lg text-white">
        <FaAngleDown />
      </motion.div>

      {/* dropdown lists. */}
      <AnimatePresence>
        {dropdown && (
          <motion.div
            {...dropUpandDown}
            className="flex flex-col items-start justify-start absolute top-16 right-0 min-w-[180px] bg-secondary z-10 gap-2 py-2          px-4    rounded-xl text-primaryText text-lg">
            {Menus &&
              Menus.map((menu) => (
                <Link
                  to={menu.uri}
                  key={menu.id}
                  className="px-2 py-1 hover:bg-[rgba(256,256,256,0.05)] w-full rounded-lg">
                  {menu.name}
                </Link>
              ))}
            <motion.p
              onClick={() => signOutAction()}
              whileTap={{ scale: 0.9 }}
              className="px-2 py-1 hover:bg-[rgba(256,256,256,0.05)] w-full rounded-lg">
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
