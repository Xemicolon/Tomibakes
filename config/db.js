const mongoose = require("mongoose");

exports.db = async () => {
  try {
  const db_connect = await mongoose.connect(
    process.env.NODE_ENV === "production" ? process.env.DB_URI : process.env.DB_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
//       user: process.env.NODE === "production" ? process.env.mongoUser : "",
//       pass: process.env.NODE === "production" ? process.env.mongoPass : "",
    }
  );

  console.log(
    `Database Connected\nDatabase Url: ${db_connect.connection.host}`
  );
  } catch(err) {
    console.log(err)
    return err
  }
};
