import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const connect = async () => {
  const connection = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  // TO DO Refactor - should be in different files
  const UsersSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    image: String,
    emailVerified: String,
  });

  const User = mongoose.models.User || mongoose.model("User", UsersSchema);

  const AccountSchema = new mongoose.Schema({
    _id: String,
    provider: String,
    type: String,
    providerAccountId: String,
    access_token: String,
    token_type: String,
    expires_at: Number,
    refresh_token: String,
    scope: String,
    userId: [{ type: ObjectId, ref: User }],
  });

  const SessionSchema = new mongoose.Schema({
    _id: String,
    sessionToken: String,
    userId: String,
    expired: String,
  });

  const Account =
    mongoose.models.Account || mongoose.model("Account", AccountSchema);

  const Session =
    mongoose.models.Session || mongoose.model("Session", SessionSchema);

  return { connection, Account, Session, User };
};
