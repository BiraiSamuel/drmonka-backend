const ChatService = require("../services/chatService");

module.exports = class Chat {
  static async apiChatWithDoctor(req, res, next) {
    try {
      const dataJSON = {
        phone: {
          to: req.body.phone,
        },
      };
      const callStatus = await ChatService.callDoctor(dataJSON);
      if (!callStatus) {
        res.status(404).json("Call couldn't be established!");
      }
      res.json(callStatus);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }

  static async getChatWithDoctor(req, res, next) {
    try {
      const chats = await ChatService.getChatWithDoctor(req.body);
      res.json(chats);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }
  static async getAllConsultations(req, res, next) {
    try {
      const consultations = await ChatService.getAllConsultations(req.body);
      res.json(consultations);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }
};
