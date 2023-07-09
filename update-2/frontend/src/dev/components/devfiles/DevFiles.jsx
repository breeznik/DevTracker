import React, { useContext, useEffect, useState } from "react";
import { DevLocalContext } from "../../Context/devLocalContext";
import { DevContext } from "../../Context/devContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./devfiles.scss";
import { storage } from "../../../firebase";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  refFromURL,
} from "firebase/storage";
import { v4 } from "uuid";
import remove1 from "../../../assets/remove1.png";

const DevFiles = () => {
  const { setdevData, devData } = useContext(DevContext);
  const { projectindex } = useContext(DevLocalContext);
  const [modulearray, setmodulearray] = useState(
    devData.project[projectindex]?.modules
  );
  const [selectedmodule, setselectedmodule] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filelist, setfilelist] = useState([]);
  const [seletedModuelIndex, setSMI] = useState(null);
  const filelistRef = ref(
    storage,
    `projects/${devData.project[projectindex]?._id}/${selectedmodule}`
  );
  const [modDown, setmodDown] = useState(false);
  useEffect(() => {
    setmodulearray(devData.project[projectindex]?.modules);
    setselectedmodule("");
  }, [projectindex]);

  useEffect(() => {
    listAll(filelistRef).then((response) => {
      setfilelist([]);
      console.log("response throught filelsit 2 ", response);
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setfilelist([...filelist, url]);
        });
      });
    });
    console.log(filelistRef);
  }, [selectedmodule]);

  const handleSelection = (module, index) => {
    if (selectedmodule !== module.moduleID) {
      setselectedmodule(module.moduleID);
      setSMI(index);
    } else {
      setselectedmodule("");
      setSMI(null);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const upload = async () => {
    if (selectedFile === null) return;
    const fileid = `${selectedFile.name + "_uuid_" + v4()}`;
    const filePath = `projects/${devData.project[projectindex]._id}/${selectedmodule}/${fileid}`;
    console.log(selectedFile.name);
    const fileRef = ref(
      storage,
      `projects/${devData.project[projectindex]._id}/${selectedmodule}/${fileid}`
    );

    try {
      const response = await uploadBytes(fileRef, selectedFile);
      const filelistRef = ref(storage, filePath);
      const downloadUrl = await getDownloadURL(filelistRef);

      const updatedModules = devData.project[projectindex].modules.map(
        (module) => {
          if (module.moduleID === selectedmodule) {
            const updateFiles = [
              ...module.moduleFiles,
              {
                fileName: selectedFile.name,
                firbasePath: filePath,
                fileSize: (selectedFile.size / 1024).toFixed(2),
                firebaseDownloadLink: downloadUrl,
              },
            ];

            return {
              ...module,
              moduleFiles: updateFiles,
            };
          }
          return module;
        }
      );

      await axios.put(`http://localhost:5000/dev/updateModule`, {
        params: {
          projectId: devData.project[projectindex]._id,
          updatedModules,
        },
      });

      console.log(
        "put request response for firbase id update : ",
        updatedModules
      );

      const projects = [...devData.project];
      projects[projectindex] = {
        ...projects[projectindex],
        modules: updatedModules,
      };
      setdevData((prevData) => {
        return {
          ...prevData,
          project: projects,
        };
      });

      toast.success("File Uploaded", {
        autoClose: 3000,
      });
      setSelectedFile(null);
      console.log("response ", response);
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = (itemPath, itemIndex) => {
    const updatedFileArray = modulearray[seletedModuelIndex].moduleFiles.filter(
      (_, index) => index !== itemIndex
    );

    // let updatedFileArray = modulearray[seletedModuelIndex].moduleFiles.map(
    //   (file, index) => {
    //     if (index !== itemIndex) {
    //       return file;
    //     }
    //   }
    // );

    console.log("updated file array ", updatedFileArray);
    let updatedModuleArray = modulearray.map((module, index) => {
      if (index === seletedModuelIndex) {
        return {
          ...module,
          moduleFiles: updatedFileArray,
        };
      }
      return module;
    });

    console.log("updated Module array ", updatedModuleArray);
    const updatedProject = {
      ...devData.project[projectindex],
      modules: updatedModuleArray,
    };
    console.log("updated project", updatedProject);

    setdevData((prevState) => ({
      ...prevState,
      project: prevState.project.map((project, index) => {
        if (index === projectindex) {
          return updatedProject;
        }
        return project;
      }),
    }));

    console // File successfully deleted
      .log("File deleted.");
  };
  const moduleItemDeleter = async (itemPath, itemIndex) => {
    try {
      const fileRef = ref(storage, itemPath);
      console.log("deleteRef: ", fileRef);
      const response = await deleteObject(fileRef);
      updateData(itemPath, itemIndex);
    } catch (error) {
      console.error("Error deleting file:", error);
      updateData(itemPath, itemIndex);
    }
  };
  const getDownloadLink = async (filepath) => {
    const filelistRef = ref(storage, filepath);
    const downloadUrl = await getDownloadURL(filelistRef);
    return downloadUrl;
  };
  return (
    <div className="fileComponent">
      {" "}
      <div className="background">
        <div className="heading">Modules</div>
        <div className="modlist">
          {modulearray?.map((module, index) => (
            <li
              key={index}
              onClick={() => handleSelection(module, index)}
              style={
                selectedmodule === module.moduleID
                  ? {
                      backgroundColor: "rgba(62, 128, 116, 0.6)",
                    }
                  : {}
              }
            >
              {module.moduleName}
            </li>
          ))}
        </div>
      </div>
      {selectedmodule !== "" && (
        <div className="FilesBackground">
          <div className="heading">
            <span className="mainheading">Files</span>
            <div className="subheading">
              <span className="filename">FILE NAME</span>
              <span className="size">SIZE</span>
            </div>
          </div>

          <div className="FILES">
            <div className="filelist">
              {selectedmodule &&
                devData.project[projectindex].modules[
                  seletedModuelIndex
                ].moduleFiles.map((file, index) => {
                  return (
                    <div
                      className="data"
                      onMouseOver={() => setmodDown(true)}
                      onMouseLeave={() => setmodDown(false)}
                    >
                      <div className="fname">{file?.fileName}</div>

                      {modDown ? (
                        <>
                          <div
                            className="fileDownload"
                            onClick={() =>
                              window.open(file?.firebaseDownloadLink)
                            }
                          >
                            Download
                          </div>
                          <div className="removeMod">
                            <img
                              src={remove1}
                              onClick={() =>
                                moduleItemDeleter(file?.firbasePath, index)
                              }
                              alt="delete"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="fsize">{file?.fileSize}KB</div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bottom">
            <div className="fileinput">
              <input
                id="input"
                onChange={handleFileChange}
                style={{ dislplay: "none" }}
                type="file"
              />
              <label htmlFor="input" className="inputlabel">
                CHOOSE FILE
              </label>
              <div className="selectedFileDiv">
                {selectedFile && (
                  <span className="selected-file">{selectedFile.name}</span>
                )}
              </div>
            </div>
            <div className="button">
              <button onClick={upload}>Uploade files</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DevFiles;
