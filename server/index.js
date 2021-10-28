// establish an express app
const express = require("express");
// Calling graphql server
const graphqlHTTP = require("express-graphql").graphqlHTTP; // -> new
const app = express();

const expressPlayground = require("graphql-playground-middleware-express")
  .default;

// allow requests from outside resources like postman, or your frontend if you choose to build that out
const cors = require("cors");
app.use(cors());

// app will serve and receive data in a JSON format
app.use(express.json());

// the messenger between our app and our database
const mongoose = require("mongoose");

// allow us to hide our connection secret in the process.env object
require("dotenv").config();

const source = process.env.ATLAS_CONNECTION;
const PORT = process.env.PORT || 5000;

// Establish connection & give yourself a message so you know when its complete
mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB connected");
});

/*
app.use("/graphiql",
  graphqlHTTP({
    schema: require('./src/graphql/schema.js'), 
    graphiql: true,
  })
);
*/

// GraphQl route
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

// Open server and console print message
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
