import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  foreignKey,
  doublePrecision,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const userSession = pgTable(
  "UserSession",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    token: text("token").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("UserSession_token_key").on(table.token),
      userIdKey: uniqueIndex("UserSession_userId_key").on(table.userId),
    };
  }
);

export const category = pgTable(
  "Category",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    name: text("name").notNull(),
    categoryId: text("categoryId"),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Category_name_key").on(table.name),
      categoryCategoryIdFkey: foreignKey({
        columns: [table.categoryId],
        foreignColumns: [table.id],
      })
        .onUpdate("cascade")
        .onDelete("set null"),
    };
  }
);

export const role = pgTable(
  "Role",
  {
    id: text("id").notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Role_name_key").on(table.name),
    };
  }
);

export const product = pgTable("Product", {
  id: text("id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  staffPick: boolean("staffPick").notNull(),
  categoryId: text("categoryId")
    .notNull()
    .references(() => category.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }).notNull(),
});

export const roleToUser = pgTable(
  "_RoleToUser",
  {
    a: text("A")
      .notNull()
      .references(() => role.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: text("B")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      abUnique: uniqueIndex("_RoleToUser_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    };
  }
);

export const image = pgTable("Image", {
  id: text("id").notNull(),
  secret: text("secret"),
  server: text("server"),
  farm: integer("farm"),
  title: text("title").default("Product image").notNull(),
  ownername: text("ownername"),
  imageType: text("imageType"),
  fileName: text("fileName"),
  baseName: text("baseName"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }).notNull(),
  productId: text("productId").references(() => product.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const user = pgTable(
  "User",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    username: text("username").notNull(),
    firstName: text("firstName"),
    lastName: text("lastName"),
    passwordHash: text("passwordHash").notNull(),
  },
  (table) => {
    return {
      usernameKey: uniqueIndex("User_username_key").on(table.username),
    };
  }
);
