CREATE TABLE IF NOT EXISTS "Category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"category_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Image" (
	"id" uuid PRIMARY KEY NOT NULL,
	"secret" text,
	"server" text,
	"farm" integer,
	"title" text DEFAULT 'Product image' NOT NULL,
	"ownername" text,
	"imageType" text,
	"fileName" text,
	"baseName" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"productId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" double precision NOT NULL,
	"staffPick" boolean NOT NULL,
	"categoryId" uuid NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Role" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_RoleToUser" (
	"A" uuid NOT NULL,
	"B" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"username" text NOT NULL,
	"firstName" text,
	"lastName" text,
	"passwordHash" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserSession" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Category" ADD CONSTRAINT "Category_category_id_Category_id_fk" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_Role_id_fk" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_User_id_fk" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Role_name_key" ON "Role" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_RoleToUser_AB_unique" ON "_RoleToUser" ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_RoleToUser_B_index" ON "_RoleToUser" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserSession_token_key" ON "UserSession" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserSession_userId_key" ON "UserSession" ("userId");