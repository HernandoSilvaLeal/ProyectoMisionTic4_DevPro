const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const connection = mongoose.connection;
const expressPlayground =
  require("graphql-playground-middleware-express").default;
require("dotenv").config();

console.log();

app.use(cors());
app.use(express.json());

const source = process.env.ATLAS_CONNECTION;
const PORT = process.env.PORT || 5000;

mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("DB connected");
});

app.use(
  "/graphiql",
  cors(),
  graphqlHTTP(async (req) => ({
    schema: require("./src/graphql/schema.js"),
    graphiql: true,
    context: {
      token: req.headers.authorization,
    },
  }))
);

app.get("/playground", expressPlayground({ endpoint: "/graphiql" }));

app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
