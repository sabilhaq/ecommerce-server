const { buildSchema } = require("graphql");
const services = require("../services");

const schema = buildSchema(`
  scalar Date

  type Variant { 
    color: String 
    capacity: Int 
    quantity: Int 
    price: Int 
  }

  type Product { 
    id: Int!
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
    title: String!
    rate: Int!
    description: String
    brand: String
    detail: String
    votes: Int!
    quantity: Int!
    price: Int!
    UserId: String
    photos: [String]
  }

  type Query {
    getProducts(page: Int, offset: Int, limit: Int, name: String, phone: String): [Product]
    getProduct(id: Int!): Product
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: Int!, input: ProductInput): Product
    deleteProduct(id: Int!): Product
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
};

module.exports = { schema, root };
