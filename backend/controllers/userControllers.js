const asyncHandler = require("express-async-handler");
const adminModel = require("../models/adminModel");
const DevModel = require("../models/devmodel");
const ProjectModel = require("../models/projectmodel");
const bcrypt = require("bcrypt");

//@desc Register a user
//@routes POST /Register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (!type) {
    res.status(400);
    throw new Error("Type is mandatory");
  }

  if (type === "dev") {
    const { devid, password, devname, adminid } = req.body;

    if (!password || !devname || !adminid) {
    }

    const userAvailable = await DevModel.findOne({ devid });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }

    const user = await DevModel.create({
      devid,
      devname,
      password,
      type,
      adminid,
    });

    console.log(`user created ${user}`);

    if (user) {
      const userinfo = {
        user: {
          devname,
          devid: user.devid,
          project: [],
          type: user.type,
        },
      };

      res.status(201).json(userinfo);
    } else {
      res.status(400);
      throw new Error("user data is not valid");
    }
  }

  if (type === "admin") {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("All fields are mandatory");
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    //user data loader if exist
    const userAvailable = await adminModel.findOne({ email });

    //user availablity checker
    if (userAvailable) {
      console.log("user already registered");
      res.status(400);
      throw new Error("User already registered!");
    }

    //user creation
    const user = await adminModel.create({
      email,
      password,
      type,
    });

    //checker
    console.log(`user created ${user}`);

    if (user) {
      const userinfo = {
        user: {
          email: user.email,
          id: user.id,
          type: user.type,
        },
      };

      res.status(201).json(userinfo);
    } else {
      res.status(400);
      throw new Error("user data is not valid");
    }
  }
});

//@desc login a user
//@routes POST /login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (!type) {
    res.status(400);
    throw new Error("Type is mandatory");
  }

  if (type === "dev") {
    const { devid, password } = req.body;
    if (!devid || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await DevModel.findOne({ devid });
    if (user && password === user.password) {
      const project = await ProjectModel.find({
        assignedDev: { $in: [user.id] },
      });
      console.log(project);
      const userinfo = {
        user: {
          adminid: user.adminid,
          devid: user.devid,
          devname: user.devname,
          project,
          id: user.id,
          type: user.type,
        },
      };

      res.status(200).json({ userinfo });
    } else {
      res.status(400);
      throw new Error("DevID or password is not valid");
    }
  }

  if (type === "admin") {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await adminModel.findOne({ email });

    if (user && password === user.password) {
      const adminid = user._id;
      const devs = await DevModel.find({ adminid });
      const projects = await ProjectModel.find({ adminid });
      console.log(projects);
      const userinfo = {
        user: {
          email: user.email,
          projects,
          id: user.id,
          type: user.type,
          devs,
        },
      };
      console.log(userinfo);
      res.status(200).json(userinfo);
    } else {
      res.status(400);
      throw new Error("Email or password is not valid");
    }
  }
});

//@desc getDevs
//@routes get /admin/devs
//@access private
const getDevs = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("ID is mandatory to fetch devs info");
    } else {
      const devs = await DevModel.find({ adminid: id });
      const devinfo = {
        devs,
      };
      res.status(200).json(devinfo);
      console.log(devinfo);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc getDevs
//@routes get /admin/devs
//@access private
const getAdmininfo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Admin ID is mandatory");
    }
    const user = await adminModel.findOne({ _id: id });

    if (user) {
      const devs = await DevModel.find({ adminid: id });
      const projects = await ProjectModel.find({ adminid: id });
      console.log("project: ", projects, " /n devs: ", devs);

      const userinfo = {
        user: {
          projects,
          id: user.id,
          email: user.email,
          devs,
        },
      };

      console.log(userinfo);
      res.status(200).json(userinfo);
    } else {
      res.status(400);
      throw new Error("admin id is not valid");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc getDevs
//@routes get /admin/devs
//@access private
const getDevinfo = asyncHandler(async (req, res) => {
  console.log("get dev info triggered ");
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Dev ID is mandatory");
    }
    const user = await DevModel.findOne({ devid: id });

    if (user) {
      const project = await ProjectModel.find({
        assignedDev: { $in: [user.id] },
      });

      const userinfo = {
        user: {
          adminid: user.adminid,
          devid: user.devid,
          project,
          id: user.id,
          type: user.type,
        },
      };

      console.log("sending user dev info on get request ");
      res.status(200).json(userinfo);
    } else {
      res.status(400);
      throw new Error("admin id is not valid");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc deleteDev
//@routes delete /:id
//@access private
const deleteDev = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("both dev and admin id is mandatory ");
    } else {
      const dev = await DevModel.findById(id);
      console.log(dev);

      if (!dev) {
        res.status(404);
        throw new Error("Dev id mismatch");
      }

      await DevModel.findByIdAndDelete(id);
      console.log(dev.devname, "Deleted");
      res.status(201).json(dev);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getDevs,
  deleteDev,
  getAdmininfo,
  getDevinfo,
};
