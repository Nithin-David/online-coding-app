import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {motion} from "framer-motion";
import { FaBookmark } from 'react-icons/fa';

const Projects = () => {
const projects = useSelector(state => state.projects?.project);
const { searchTerm } = useSelector((state) => state.searchTerm);

const [filterd, setFilterd] = useState(null);

useEffect(() => {
  if (searchTerm.length > 0){
    setFilterd(
      projects?.filter((project) => {
        const lowerCasedItem = project?.title.toLowerCase();
        return searchTerm
          .split("")
          .every((letter) => lowerCasedItem.includes(letter));
      })
    );
  }else{
    setFilterd(null);
  }
}, [searchTerm]);


  return (
    <div className='w-full flex items-center justify-center gap-6 flex-wrap py-8 px-4'>
     {filterd ?  (<>{filterd && filterd.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))} </> ): (<> {projects && projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}</>)}
    </div>
    )
}

export default Projects;


const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      key={index}
      className="p-2 flex flex-col items-center justify-center gap-2 w-full md:w-[280px] h-[350px] bg-secondary rounded-md overflow-hidden shadow-lg shadow-gray-800">
      {project && (
        <>
          <div
            className="bg-white w-full h-full rounded-sm"
            style={{ overflow: "hidden", height: "100%" }}>
            <iframe
              title="Result"
              srcDoc={project.output}
              style={{ border: "none", width: "100%", height: "100%" }}
            />
          </div>
          {/* profile details */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2 ">
              <div className="flex items-center justify-center overflow-hidden bg-emerald-500 rounded-xl w-12 h-12">
                {project?.user?.photoURL ? (
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    className="object-cover w-full h-full"
                    src={project?.user?.photoURL}
                    referrerPolicy="no-referrer"
                    alt={project?.user?.displayName}
                  />
                ) : (
                  <p className="text-lg text-white">
                    {project?.user?.displayName[0]}
                  </p>
                )}
              </div>

              {/* title and name */}
              <div className="flex flex-col items-start justify-start gap-1 overflow-hidden">
                {project && <p className="text-white">{project.title}</p>}
                {project && project?.user?.displayName ? (
                  <p className="text-gray-500">{project.user.displayName}</p>
                ) : (
                  <p className="text-gray-500">{project.user.email}</p>
                )}
              </div>

            </div>
              {/* bookmark */}
              <div className='text-white cursor-pointer'>
                <FaBookmark />
              </div>
          </div>
        </>
      )}
    </motion.div>
  );
}