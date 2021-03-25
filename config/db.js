const mongoose = require("mongoose");

exports.db = async () => {
  const db_connect = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: process.env.mongoUser,
    pass: process.env.mongoPass,
  });

  console.log(
    `Database Connected\nDatabase Url: ${db_connect.connection.host}`
  );
};
