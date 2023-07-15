import React, { useContext, useEffect, useState } from "react";
import "./devappcss/devphaseboard.scss";
import Phaseboards from "../../dev/components/phaseboard/Phaseboards";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DevLocalContext } from "../../dev/Context/devLocalContext";
import { DevContext } from "../../dev/Context/devContext";

const DevPhaseBoard = () => {
  return (
    <div className="phaseboard">
      <DndProvider backend={HTML5Backend}>
        <Phaseboards></Phaseboards>
      </DndProvider>
    </div>
  );
};

export default DevPhaseBoard;
