const { buildSchema } = require('graphql');
const services = require('../services');

const schema = buildSchema(`
  scalar Date

  type Variant { 
    color: String 
    capacity: Int 
    quantity: Int 
    price: Int 
  }

  type Product { 
    id: String!
    title: String!
    rate: Int!
    description: String
    brand: String
    detail: String
    votes: Int!
    quantity: Int!
    price: Int!
    UserId: String
    variants: [Variant]
    photos: [String]
    createdAt: Date
    updatedAt: Date
  }

  input ProductInput {
    id: String!
    title: String!
    rate: Int!
    description: String
    brand: String
    detail: String
    votes: Int!
    quantity: Int!
    price: Int!
    UserId: String!
    photos: [String]
  }


  type Chat { 
    _id: String!
    status: String!
    content: String
    sent: Boolean!
    createdAt: Date
    updatedAt: Date
  }

  input ChatInput {
    content: String!
    sender: String! 
    receiver: String
  }

  type Query {
    getProducts(page: Int, title: String): [Product]
    getProduct(id: String!): Product

    getChats(sender: String!, receiver: String!): [Chat]
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: Int!, input: ProductInput): Product
    deleteProduct(id: Int!): Product

    createChat(input: ChatInput): Chat
  }
`);

const root = {
  getProducts: async (queryStringObj) => {
    try {
      const products = await services.getProducts(queryStringObj);
      return products;
    } catch (err) {
      throw err;
    }
  },
  getProduct: async ({ id }) => {
    try {
      const product = await services.getProduct(id);
      return product;
    } catch (err) {
      throw err;
    }
  },
  createProduct: async ({ input }) => {
    try {
      const product = await services.createProduct(input);
      return product;
    } catch (err) {
      throw err;
    }
  },
  updateProduct: async ({ id, input }) => {
    try {
      const product = await services.updateProduct(id, input);
      return product;
    } catch (err) {
      throw err;
    }
  },
  deleteProduct: async ({ id }) => {
    try {
      const product = await services.deleteProduct(id);
      return product;
    } catch (err) {
      throw err;
    }
  },

  getChats: async ({ sender, receiver }) => {
    try {
      const chats = await services.getChats(sender, receiver);
      return chats;
    } catch (err) {
      throw err;
    }
  },
  createChat: async ({ input }) => {
    try {
      const chat = await services.createChat(input);
      return chat;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { schema, root };
