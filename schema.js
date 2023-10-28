const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Person {
    hello: String
  }
`)
module.exports = schema