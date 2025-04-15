import mongoose from "mongoose";
const connection = async () => {
  await mongoose
    // "mongodb+srv://patidaranshu490:JcD7K1fmkF5WjEUd@cluster0.gdg4j.mongodb.net/ECommerce"
    // .connect(process.env.DBURL)
    // oVWBml9bSAKBA0K3
    // GIegtJLjXaOQEiC6
    // officialscripthq

    .connect(
      "mongodb+srv://Scripthq:kBHme6rj6SyaF5iz@cluster0.4gnpzwc.mongodb.net/scriptHQ"
      // "mongodb+srv://patidaranshu490:oVWBml9bSAKBA0K3@cluster0.jzpgt.mongodb.net/"
    )
    .then((x) => console.log("Connected Succesfully..."))
    .catch((err) => console.log("Connection Failed...", err));
};
export default connection;
