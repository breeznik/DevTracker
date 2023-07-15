import React from "react";
import "./aboutus.scss";
export const AboutUs = () => {
  return (
    <div className="about">
      <div className="AboutUsContent">
        <div className="AboutUsHeading">WELCOME TO DEVTRACKER</div>
        <>
          <p className="aboutUsP">
            your go-to solution for efficient project management and tracking in
            the world of software development. With our feature-rich web
            application, we aim to simplify the complexities of project
            management and enhance collaboration between administrators and
            developers.
          </p>
          <p className="aboutUsP">
            With DevTracker, administrators can effortlessly create and manage
            projects, assign tasks, and track progress in real-time. Developers
            can stay organized, track module progress, conduct testing, and
            submit code files, all within a centralized platform.
          </p>
        </>
      </div>
    </div>
  );
};
