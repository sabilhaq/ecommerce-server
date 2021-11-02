const models = require("../models");

const getProducts = async () => {
  try {
    const videos = await models.Product.findAll({
      order: [
        ["rate", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    return res.json(videos);
  } catch (err) {
    throw err;
  }
};

//Create new instance
const createProduct = (input) => {
  return new Promise((resolve, reject) => {
    signInWithCustomToken(auth, token)
      .then(async (userCredential) => {
        const id = Date.now().toString();
        const product = await setDoc(doc(productsCollection, id), {
          id: id,
          name: input.name,
          phone: input.phone,
          createdAt: Timestamp.fromDate(new Date(Date.now())),
          updatedAt: Timestamp.fromDate(new Date(Date.now())),
        });

        resolve({
          id: id,
          name: input.name,
          phone: input.phone,
          createdAt: Timestamp.fromDate(new Date(Date.now())),
          updatedAt: Timestamp.fromDate(new Date(Date.now())),
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
};

//Update existing instance
const updateProduct = (id, input) => {
  return new Promise((resolve, reject) => {
    signInWithCustomToken(auth, token)
      .then(async (userCredential) => {
        const productRef = doc(db, "products", id);
        const update = {
          createdAt: serverTimestamp(),
        };
        if (input.name) {
          update.name = input.name;
        }
        if (input.phone) {
          update.phone = input.phone;
        }

        await updateDoc(productRef, update);

        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
        } else {
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
};

//Delete an instance
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    signInWithCustomToken(auth, token)
      .then(async (userCredential) => {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        await deleteDoc(productRef);
        if (productSnap.exists()) {
        } else {
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
