import React, { useEffect, useState } from "react";
import { Home, NewProject } from "./container";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { SpinnerLoader } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/slices/userSlice";
import { SET_PROJECT } from "./context/slices/projectSlice";

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  {
    /* if auth changed it will render automatically and update it in the redux store. */
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log("userCred", userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //add action to the redux.
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    });

    return () => unsubscribe(); // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectList = querySnapshot.docs.map((doc) => doc.data());
      dispatch(SET_PROJECT(projectList));
    };
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />

            {/* default path making as home */}
            <Route path="*" element={<Navigate to={<Home />} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
