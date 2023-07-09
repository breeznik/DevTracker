import React, { useContext, useEffect, useState } from "react";
import { DevLocalContext } from "../../Context/devLocalContext";
import { DevContext } from "../../Context/devContext";
import "./testingboard.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Testingboard = () => {
  const { setdevData, devData } = useContext(DevContext);

  const { projectindex } = useContext(DevLocalContext);

  const [testscore, settestscore] = useState([]);

  const [modulearray, setmodulearray] = useState(
    devData.project[projectindex]?.modules
  );

  const [selectedmodule, setselectedmodule] = useState("");

  useEffect(() => {
    setmodulearray(devData.project[projectindex]?.modules);
    setselectedmodule("");
  }, [projectindex]);

  useEffect(() => {
    settestscore([]);
  }, [selectedmodule]);

  const handleSelection = (module) => {
    if (selectedmodule !== module.moduleID) {
      setselectedmodule(module.moduleID);
    } else {
      setselectedmodule("");
    }
  };
  const handtests = (index) => {
    settestscore((prevOptions) => {
      if (prevOptions.includes(index)) {
        // If the element exists in the array, remove it
        return prevOptions.filter((option) => option !== index);
      } else {
        // If the element doesn't exist, add it
        return [...prevOptions, index];
      }
    });
  };

  const tests = [
    "Initialization",
    "Validation",
    "Functionality",
    "BoundaryCases",
    "IntegrationTesting",
    "CompatibilityTesting",
    "PerformanceTesting",
    "ErrorHandling",
  ];

  const clear = () => {
    settestscore([]);
  };

  const submitHandler = async () => {
    console.log(testscore.length);

    try {
      const response = await axios.put(
        `http://localhost:5000/dev/updateModule`,
        {
          params: {
            projectId: devData.project[projectindex]._id,
            moduleTestScore: testscore.length,
            moduleID: selectedmodule,
          },
        }
      );
      console.log("put request response : ", response);

      devData.project[projectindex] = response.data;
      setselectedmodule("");
      toast.success("TestScore Updated", {
        autoClose: 3000,
      });
    } catch (err) {
      console.log("error from put request ", err);
    }
  };
  return (
    <div className="testboard">
      <div className="background">
        <div className="heading">Modules</div>
        <div className="modlist">
          {modulearray?.map((module, index) => (
            <li
              key={index}
              onClick={() => handleSelection(module)}
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
        <div className="testbackground">
          <div className="heading">Tests</div>
          <div className="testlist">
            {tests.map((test, index) => {
              return (
                <li onClick={() => handtests(index)} key={index}>
                  {test}
                  {testscore.includes(index) && (
                    <span className="checked">✔</span>
                  )}
                </li>
              );
            })}

            <div className="cleartext">
              <div className="clear" onClick={clear}>
                Clear Selection
              </div>
            </div>
          </div>
          <div className="button">
            <button onClick={submitHandler}>SUBMIT</button>
          </div>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Testingboard;
