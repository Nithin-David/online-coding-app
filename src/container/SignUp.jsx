import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const newUserCreated = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log("emailuser", userCred);
          }
        })
        .catch((err) => {
          console.error(err)
        });
    }
  };

  const logInUser = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.error(err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setErrorMessage("Invalid Email or Password");
          } else {
            setAlert(true);
            setErrorMessage("Too many login attempts. Try later!");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="text-primaryText w-full py-8">
      <p className="text-lg">CodePen</p>
      <div className="flex flex-col w-full items-center justify-center">
        <p className="text-lg py-8">Join with Us?</p>
        <div className="bg-secondary w-full md:w-auto flex flex-col gap-4 items-center justify-center py-4 px-8 rounded-xl drop-shadow-md">
          {/* email */}
          <UserAuthInput
            placeholder="Email here..."
            key={"email"}
            label="Email"
            Icon={MdEmail}
            isPass={false}
            setStateFunction={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            placeholder="Enter Password..."
            key={"password"}
            label="password"
            Icon={TbPasswordUser}
            isPass={true}
            setStateFunction={setPassword}
          />
          {/* alert section */}
          <AnimatePresence>
            {alert && (
              <motion.p {...fadeInOut} key={"alertMessage"} className="text-red-600">{errorMessage}</motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!isLogedIn ? (
            <motion.div
              onClick={newUserCreated}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 py-2 w-full text-center">
              <p>SignUp</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={logInUser}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 py-2 w-full text-center">
              <p>LogIn</p>
            </motion.div>
          )}

          {/* account text section */}
          {!isLogedIn ? (
            <p className="flex items-center justify-center gap-2">
              Already have an account !{" "}
              <span
                onClick={() => setIsLogedIn(!isLogedIn)}
                className="text-emerald-500 cursor-pointer">
                Login Here
              </span>{" "}
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2">
              Does't have an account !{" "}
              <span
                onClick={() => setIsLogedIn(!isLogedIn)}
                className="text-emerald-500 cursor-pointer">
                Create Here
              </span>{" "}
            </p>
          )}

          {/* or section */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-32 bg-gray-500"></div>
            <p>OR</p>
            <div className="h-[1px] w-32 bg-gray-500"></div>
          </div>

          {/* sign in with google */}
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center bg-[rgba(256,256,256,0.2)] cursor-pointer hover:bg-[rgba(256,256,256,0.25)] px-4 py-2 gap-3 rounded-md text-lg w-full">
            <FcGoogle className="text-xl" />
            <p className="text-white">Sign in with google</p>
          </motion.div>

          {/* or section */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-32 bg-gray-500"></div>
            <p>OR</p>
            <div className="h-[1px] w-32 bg-gray-500"></div>
          </div>

          {/* sign with github */}
          <motion.div
            onClick={signInWithGitHub}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center bg-[rgba(256,256,256,0.2)] cursor-pointer hover:bg-[rgba(256,256,256,0.25)] px-4 py-2 gap-3 rounded-md text-lg w-full">
            <FaGithub className="text-xl text-white" />
            <p className="text-white">Sign in with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
