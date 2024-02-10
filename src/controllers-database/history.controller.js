
import History from "../models/history.model.js";

import User from "../models/user.model.js";


export const getChangesByUser = async (req, res) => {
    try {
      const id = req.params.id; // O obtener el ID del usuario de otro modo, por ejemplo, de req.user.id
  
      const changes = await History.find({ changedBy: mongoose.Types.ObjectId(id) });
  
      return res.json(changes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

  export const getChangesByDocument = async (req, res) => {
    try {
      const id = req.params.id; // Asegúrate de obtener el ID del documento de alguna manera
      console.log(req.params.id)

      //const changes = await History.find({ documentId: mongoose.Types.ObjectId(id) });
      //const changes = await History.find({ documentId: id });
      //     const tasks = await Task.find({ user : req.user.id }).populate("user");
      const changes = await History.find({ documentId: id })
      .populate({
        path: 'changedBy',
        model: User,
        select: 'username email' // Especifica los campos que deseas obtener del usuario
      })
      .exec(); // Ejecuta la consulta


  
      return res.json(changes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  