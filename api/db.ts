import {
  accountsDBEndpoint,
  sessionsDBEndpoint,
  usersDBEndpoint,
  accountByUserIdDBEndpoint,
  userByEmailDBEndpoint,
} from "../utils/endpoints";
import { Accounts, Sessions, Users } from "../utils/types";

export enum MongoEndpoints {
  Accounts = "accounts",
  Users = "users",
  Sessions = "sessions",
}

const getAccounts = async (): Promise<Accounts[] | undefined> => {
  try {
    const accountsRes = await fetch(accountsDBEndpoint());
    return await accountsRes.json();
  } catch (error) {
    // TODO Refactor all error logs
    console.error("Failed to fetch accounts: ", error);
    return;
  }
};

const getAccountByUserId = async (
  userId: string
): Promise<Accounts[] | undefined> => {
  try {
    const accountRes = await fetch(accountByUserIdDBEndpoint(userId));
    return await accountRes.json();
  } catch (error) {
    // TODO Refactor all error logs
    console.error("Failed to fetch accounts: ", error);
    return;
  }
};

const getUserByEmail = async (email: string): Promise<Users | undefined> => {
  try {
    const usersRes = await fetch(userByEmailDBEndpoint(email));
    return await usersRes.json();
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return;
  }
};

const getUsers = async (): Promise<Users[] | undefined> => {
  try {
    const usersRes = await fetch(usersDBEndpoint());
    return await usersRes.json();
  } catch (error) {
    console.error("Failed to fetch users: ", error);
    return;
  }
};

const getSessions = async (): Promise<Sessions[] | undefined> => {
  try {
    const sessionsRes = await fetch(sessionsDBEndpoint());
    return await sessionsRes.json();
  } catch (error) {
    console.error("Failed to fetch sessions: ", error);
    return;
  }
};

export {
  getAccounts,
  getUsers,
  getUserByEmail,
  getSessions,
  getAccountByUserId,
};
