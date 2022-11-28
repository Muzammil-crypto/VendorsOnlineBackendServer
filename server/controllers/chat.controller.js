const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const { sendMessage } = require('../sockets/SocketManger');

class ChatController {
	static async createChat(req, res) {
		try {
			const { users } = req.body;

			// if no exists with same users
			const chatCheck = await Chat.findOne({ users }).populate('users');

			if (chatCheck) {
				return res.status(200).json({
					data: chatCheck,
				});
			}

			const chat = await Chat.create({ users });

			const populatedChat = await Chat.populate(chat, { path: 'users' });

			res.status(201).json({
				data: populatedChat,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	}

	static async getChats(req, res) {
		try {
			const chats = await Chat.find({ users: req.user._id }).populate('users');
			console.log('chat', chats);

			// append only first message
			for (let i = 0; i < chats.length; i++) {
				const chat = chats[i];
				const message = await Message.findOne({ chat: chat._id })
					.sort({
						createdAt: -1,
					})
					.populate('sender')
					.populate('job');

				// add last message key to chat object and set it to message and set chat back to chats
				chats[i] = { ...chat.toJSON(), lastMessage: message };
			}

			res.status(200).json({
				data: chats,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	}

	static async getChat(req, res) {
		try {
			const chat = await Chat.findById(req.params.id).populate('users');

			const messages = await Message.find({ chat: chat._id })
				.populate('sender')
				.populate({
					path: 'job',
					populate: {
						path: 'reviews',
					},
				});

			const chatWithMessages = { ...chat.toJSON(), messages };

			res.status(200).json({
				data: chatWithMessages,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	}

	static async addTextMessage(req, res) {
		try {
			const { receiverId, text } = req.body;

			const message = await Message.create({
				text,
				sender: req.user._id,
				chat: req.params.id,
			});

			const populatedMessage = await Message.findById(message._id)
				.populate('sender')
				.populate('job');

			sendMessage(receiverId, populatedMessage);

			res.status(201).json({
				data: populatedMessage,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	}

	static async addReferenceMessage(req, res) {
		try {
			const { text, job, referenceType, receiverId } = req.body;

			const message = await Message.create({
				text,
				sender: req.user._id,
				chat: req.params.id,
				job,
				type: 'reference',
				referenceType,
			});

			const populatedMessage = await Message.findById(message._id)
				.populate('sender')
				.populate('job');

			sendMessage(receiverId, populatedMessage);

			res.status(201).json({
				data: populatedMessage,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	}
}

module.exports = ChatController;
