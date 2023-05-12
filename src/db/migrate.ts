import "dotenv/config";
// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
// import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./db";

console.log(process.env["MYSQL_HOSTNAME"]);

// // create the connection
// const connection = connect({
//   host: process.env["MYSQL_HOSTNAME"],
//   username: process.env["MYSQL_USERNAME"],
//   password: process.env["MYSQL_PASSWORD"],
// });

// const db = drizzle(connection);
const runMigrations = async () => {
  console.log("migration started");
  return await migrate(db, { migrationsFolder: "./migrations" });
};

runMigrations()
  .then(() => {
    console.log("Migrations ran successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
