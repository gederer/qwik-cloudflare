import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from "pg-pool";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const db = drizzle(pool);

export default db;

// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";

// // create the connection
// const connection = connect({
//   host: process.env["MYSQL_HOSTNAME"],
//   username: process.env["MYSQL_USERNAME"],
//   password: process.env["MYSQL_PASSWORD"],
// });

// export const db = drizzle(connection);

// // const allUsers = await db.select().from(user);
