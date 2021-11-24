const { v4: uuidv4 } = require('uuid');
const models = require('../models');
const User = require('../models/user');

const getProducts = async () => {
  try {
    const products = await models.Product.findAll({
      order: [
        ['rate', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
    return products.map((item) => item.dataValues);
  } catch (err) {
    throw err;
  }
};

const getProduct = async (id) => {
  try {
    const product = await models.Product.findOne({
      where: { id },
    });
    return product;
  } catch (err) {
    throw err;
  }
};

//Create new instance
const createProduct = async (input) => {
  try {
    const product = await models.Product.create(input);
    return product;
  } catch (err) {
    throw err;
  }
};

//Update existing instance
// const updateProduct = (id, input) => {
//   return new Promise((resolve, reject) => {
//     signInWithCustomToken(auth, token)
//       .then(async (userCredential) => {
//         const productRef = doc(db, 'products', id);
//         const update = {
//           createdAt: serverTimestamp(),
//         };
//         if (input.name) {
//           update.name = input.name;
//         }
//         if (input.phone) {
//           update.phone = input.phone;
//         }

//         await updateDoc(productRef, update);

//         const productSnap = await getDoc(productRef);
//         if (productSnap.exists()) {
//         } else {
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         reject(error);
//       });
//   });
// };

//Delete an instance
// const deleteProduct = (id) => {
//   return new Promise((resolve, reject) => {
//     signInWithCustomToken(auth, token)
//       .then(async (userCredential) => {
//         const productRef = doc(db, 'products', id);
//         const productSnap = await getDoc(productRef);
//         await deleteDoc(productRef);
//         if (productSnap.exists()) {
//         } else {
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         reject(error);
//       });
//   });
// };

// Chat

const getChats = async (sender, receiver) => {
  try {
    if (!sender || !receiver) {
      return res.json([]);
    }

    const users = await User.find({
      $or: [{ email: sender }, { email: receiver }],
    });

    let senderChats = [];
    let receiverChats = [];

    users.forEach((user) => {
      if (user.chats[sender]) {
        receiverChats = user.chats[sender].map((receiverChat) => {
          return (receiverChat = { ...receiverChat, status: 'Receiver' });
        });
      }

      if (user.chats[receiver]) {
        senderChats = user.chats[receiver].map((senderChat) => {
          return (senderChat = { ...senderChat, status: 'Sender' });
        });
      }
    });

    let listChat = senderChats.concat(receiverChats);

    listChat.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    return listChat;
  } catch (err) {
    throw err;
  }
};

const createChat = async (input) => {
  try {
    const sender = await User.findOne({ email: input.sender });
    const receiver = await User.findById(input.receiver);

    const receiverEmail = receiver.email;

    const chat = {
      content: input.content,
      createdAt: Date.now(),
      _id: uuidv4(),
    };

    if (!sender.chats[receiverEmail]) {
      sender.chats[receiverEmail] = [];
    }

    sender.chats[receiverEmail].push(chat);

    sender.markModified('chats');
    sender.save();

    const response = {
      ...chat,
      status: 'Sender',
      sent: true,
    };

    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  // updateProduct,
  // deleteProduct,
  getChats,
  createChat,
};
