import React, { useContext, useEffect, useState } from "react";
import { DevLocalContext } from "../../Context/devLocalContext";
import { DevContext } from "../../Context/devContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./devfiles.scss";
import { storage } from "../../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

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
    const fileid = `${selectedFile.name + "_uuid_" + v4()}`;
    const filePath = `projects/${devData.project[projectindex]._id}/${selectedmodule}/${fileid}`;

    console.log(selectedFile.name);
    if (selectedFile === null) return;
    const fileRef = ref(
      storage,
      `projects/${devData.project[projectindex]._id}/${selectedmodule}/${fileid}`
    );

    try {
      const response = await uploadBytes(fileRef, selectedFile);
      const updatedModules = devData.project[projectindex].modules.map(
        (module) => {
          if (module.moduleID === selectedmodule) {
            const updateFiles = [
              ...module.moduleFiles,
              {
                fileName: selectedFile.name,
                firbasePath: filePath,
                fileSize: (selectedFile.size / 1024).toFixed(2),
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
  // const getDownloadLink = async (filepath) => {
  //   const filelistRef = ref(storage, filepath);
  //   const downloadUrl = await getDownloadURL(filelistRef);
  //   return downloadUrl;
  // };
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
                ].moduleFiles.map((file) => {
                  return (
                    <div className="data">
                      <div className="fname">{file.fileName}</div>

                      <div className="fsize">{file.fileSize}KB</div>
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
