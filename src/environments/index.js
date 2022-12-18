const env = process.env.NEXT_ENV || "local";

const local = require("./local.env");

const prod = require("./prod.env");

export default env === "production" ? prod : local;
