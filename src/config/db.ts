import mongoose from "mongoose";
import colors from 'colors'
export const connectDB = async () : Promise<void> => {
  try {
   
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;

    console.log(colors.cyan.bold(`Mongo db Connected on: ${url}`  ));
  } catch (error) {
    console.log(colors.bgRed.bold(error.message));
    process.exit(1);
  }
};
