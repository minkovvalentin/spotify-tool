export enum MongoEndpoints {
  Accounts = "accounts",
  Users = "users",
  Sessions = "sessions",
}

const apiUrl = process.env.API_URL ?? "";

const accountsEndpoint = () => {
  return apiUrl + MongoEndpoints.Accounts;
};

const usersEndpoint = () => {
  return apiUrl + MongoEndpoints.Users;
};

const sessionsEndpoint = () => {
  return apiUrl + MongoEndpoints.Sessions;
};

export { accountsEndpoint, usersEndpoint, sessionsEndpoint };
