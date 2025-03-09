import mongoose from "mongoose";
const connection = async () => {
  await mongoose
    // "mongodb+srv://patidaranshu490:JcD7K1fmkF5WjEUd@cluster0.gdg4j.mongodb.net/ECommerce"
    // .connect(process.env.DBURL)
    // oVWBml9bSAKBA0K3
    .connect(
      "mongodb+srv://patidaranshu490:oVWBml9bSAKBA0K3@cluster0.jzpgt.mongodb.net/"
    )
    .then((x) => console.log("Connected Succesfully..."))
    .catch((err) => console.log("Connection Failed...", err));
};
export default connection;
