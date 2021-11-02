const models = require('../models');

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

module.exports = {
  getProducts,
  createProduct,
  // updateProduct,
  // deleteProduct,
};
