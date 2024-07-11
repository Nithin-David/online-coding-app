import React, { useState } from 'react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import {motion} from "framer-motion";
import { Link, Route, Routes } from 'react-router-dom';
import {Projects, SignUp} from './index';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import {SET_SEARCH_TERM} from "../context/slices/searchTermSlice";

const Home = () => {
const [isSidebar, setIsSidebar] = useState(false);
let user = useSelector(state => state.user.user);
const searchTerm = useSelector((state) =>
  state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
);

const dispatch = useDispatch();


  return (
    <>
      <div
        className={`w-2 ${
          isSidebar ? "w-2" : "flex-[.4] xl:flex-[.2]"
        } max-h-screen min-h-screen bg-secondary relative flex flex-col justify-start items-center py-6 px-3 gap-4 transition-all duration-200 ease-in-out`}>
        {/* for sidebar button */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebar(!isSidebar)}
          className="text-white absolute h-8 w-8 rounded-r-lg -right-8 bg-secondary flex items-center justify-center cursor-pointer">
          {isSidebar ? <FaAnglesRight /> : <FaAnglesLeft />}
        </motion.div>

        <div className="flex flex-col items-center justify-start gap-4 w-full overflow-hidden">
          <Link to={"/home"} className="mb-4">
            <h1 className="text-white text-3xl font-bold">CodePen</h1>
          </Link>
          {/*add a link to new project page*/}
          <Link to={"/newProject"}>
            <div className="border rounded-lg px-2 py-1 border-gray-400 group hover:border-gray-200">
              <p className="text-gray-400 text-xl group-hover:text-gray-200">
                Start Coding
              </p>
            </div>
          </Link>

          {/* see the projects only for authorised user. */}
          {user && (
            <Link to={"/home/projects"}>
              <div className="flex items-center justify-center gap-4 text-gray-400 hover:text-gray-200 text-xl">
                <MdHome />
                <p>Home</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* the main section. */}
      <div className="min-h-screen max-h-screen h-full flex flex-col items-start justify-start flex-1 px-4 md:px-12 py-4 md:py-12 overflow-y-scroll">
        {/* top section */}
        <div className="flex items-center justify-between gap-6 w-full">
          {/* for search bar */}
          <div className="flex items-center justify-center bg-secondary gap-4 px-4 py-2 w-full rounded-lg text-primaryText text-xl">
            <FaSearch />
            <input
              value={searchTerm}
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
              type="text"
              className="text-white flex-1 bg-transparent border-none outline-none placeholder:text-primaryText"
              placeholder="Search..."
            />
          </div>

          {/* for the profile section */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center">
              <Link
                to={"/home/auth"}
                className="text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 py-2">
                SignUp
              </Link>
            </motion.div>
          )}

          {user && <UserProfileDetails />}
        </div>

        {/* second section */}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home