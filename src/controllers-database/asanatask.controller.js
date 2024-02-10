import AsanaTask from "../models/asanatask.model.js";

// This controllers works with INTERNAL sources

export const getAsanaTasks = async (req, res) => {
  try {
    const tasks = await AsanaTask.find({ user : req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAsanaTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new AsanaTask({
      title,
      description,
      date,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAsanaTask = async (req, res) => {
  try {
    const deletedTask = await AsanaTask.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "AsanaTask not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAsanaTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const taskUpdated = await AsanaTask.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsanaTask = async (req, res) => {
  try {
    const task = await AsanaTask.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "AsanaTask not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
