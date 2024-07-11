import React, { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { IoLogoJavascript, IoSettingsSharp } from "react-icons/io5";
import { SiCss3, SiHtml5 } from "react-icons/si";
import SplitPane from "react-split-pane";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { copilot } from "@uiw/codemirror-theme-copilot";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfileDetails, Alert } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isInputTitle, setIsInputTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState("untitled");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const user = useSelector((state) => state.user.user);

  {/* save the program in the firebase server */}
  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: inputTitle,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    await setDoc(doc(db, "projects", id), _doc)
      .then((res) => {
        setAlertMsg("Saved Successfully..!");
        setAlert(true);
      })
      .catch((err) => {
        console.log(err);
        setAlertMsg("Not Saved..!");
        setAlert(true);
      });

    setInterval(() => {
      setAlert(false);
    }, 4000);
  };

{/* updating program for instant output */}
  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedResult = `
  <html>
    <head>
      <style> ${css} </style>
    </head>
    <body>
      ${html}
      <script> ${js} </script>
    </body>
  </html>
  `;

    setOutput(combinedResult);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start w-screen h-screen">
        {alert && <Alert alertMsg={alertMsg} />}
        {/* header section */}
        <header className="flex items-center justify-between w-full px-14 py-4 border-b-2 border-gray-800">
          {/* left section */}
          <div className="flex items-center justify-center gap-4 ">
            {/* Logo */}
            <Link to={"/home"} className="mb-4">
              <h1 className="text-white text-3xl font-bold">CodePen</h1>
            </Link>
            <div className="flex flex-col items-start justify-start gap-2">
              {/* for title and title edit section */}
              <div className="flex items-center justify-center gap-2 text-white">
                <AnimatePresence>
                  {isInputTitle ? (
                    <>
                      <input
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        type="text"
                        className="py-0 px-2 bg-transparent text-white border-none outline-none"
                        placeholder="New Name..."
                      />
                    </>
                  ) : (
                    <>
                      <p className="min-w-[100px]">{inputTitle}</p>
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isInputTitle ? (
                    <>
                      <FaCheck
                        className="cursor-pointer bg-secondary py-1 px-1 text-2xl rounded-lg"
                        onClick={() => {
                          setIsInputTitle(false);
                          
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MdEdit
                        className="cursor-pointer bg-secondary py-1 px-1 text-2xl rounded-lg"
                        onClick={() => {setIsInputTitle(true);
                          }
                        }
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* for userName and follow button */}
              <div className="flex items-center justify-center gap-2">
                {/* name section */}
                <p className="text-sm text-gray-500">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="px-2 bg-emerald-600 rounded-md text-gray-200 cursor-pointer ">
                  Follow
                </motion.div>
              </div>
            </div>
          </div>

          {/* right section */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => saveProgram()}
                whileTap={{ scale: 0.9 }}
                className="rounded-md py-2 px-4 bg-purple-700 text-white hover:bg-purple-600">
                Save
              </motion.button>

              <UserProfileDetails />
            </div>
          )}
        </header>

        {/* main section */}
        <div>
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}>
            {/*coding section */}
            <SplitPane split="vertical" minSize={500}>
              {/* for html */}
              <div className="w-full h-full flex flex-col gap-2 ">
                {/* headings */}
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center justify-center gap-2 border-t-4 border-t-slate-500 bg-secondary px-2 py-1 rounded-sm">
                    <SiHtml5 className="text-red-600" />
                    <p className="text-md text-primaryText">html</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-primaryText text-lg">
                    <IoSettingsSharp className="cursor-pointer" />
                    <FaAngleDown className="bg-secondary rounded-md cursor-pointer" />
                  </div>
                </div>

                {/* coding area */}
                <div className="w-full h-full">
                  <CodeMirror
                    value={html}
                    height="700px"
                    theme={copilot}
                    extensions={[copilot, javascript({ jsx: true })]}
                    onChange={(val, viewUpdate) => setHtml(val)}
                  />
                </div>
              </div>

              <SplitPane split="vertical" minSize={500}>
                {/* for css */}
                <div className="w-full h-full flex flex-col gap-2">
                  {/* headings */}
                  <div className="flex items-center justify-between px-3">
                    <div className="flex items-center justify-center gap-2 border-t-4 border-t-slate-500 bg-secondary px-2 py-1 rounded-sm">
                      <SiCss3 className="text-sky-500" />
                      <p className="text-md text-primaryText">css</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-primaryText text-lg">
                      <IoSettingsSharp className="cursor-pointer" />
                      <FaAngleDown className="bg-secondary rounded-md cursor-pointer" />
                    </div>
                  </div>

                  {/* coding area */}
                  <div className="w-full h-full">
                    <CodeMirror
                      value={css}
                      height="700px"
                      theme={copilot}
                      extensions={[copilot, javascript({ jsx: true })]}
                      onChange={(val, viewUpdate) => setCss(val)}
                    />
                  </div>
                </div>

                {/* for js */}
                <div className="w-full h-full flex flex-col gap-2">
                  {/* headings */}
                  <div className="flex items-center justify-between px-3">
                    <div className="flex items-center justify-center gap-2 border-t-4 border-t-slate-500 bg-secondary px-2 py-1 rounded-sm">
                      <IoLogoJavascript className="text-yellow-500" />
                      <p className="text-md text-primaryText">js</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-primaryText text-lg">
                      <IoSettingsSharp className="cursor-pointer" />
                      <FaAngleDown className="bg-secondary rounded-md cursor-pointer" />
                    </div>
                  </div>

                  {/* coding area */}
                  <div className="w-full">
                    <CodeMirror
                      value={js}
                      height="700px"
                      theme={copilot}
                      extensions={[copilot, javascript({ jsx: true })]}
                      onChange={(val, viewUpdate) => setJs(val)}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* for output showing */}
            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}>
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
