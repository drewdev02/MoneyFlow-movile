CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`photo_url` text
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`balance` real NOT NULL,
	`currency` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`type` text NOT NULL,
	`percentage` real
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`date` integer NOT NULL,
	`time` text NOT NULL,
	`name` text NOT NULL,
	`is_paid` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`target_amount` real NOT NULL,
	`current_amount` real NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`category_id` text NOT NULL,
	`notes` text,
	`date` text NOT NULL,
	`image_url` text
);
--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`date` integer NOT NULL,
	`time` text NOT NULL,
	`name` text NOT NULL,
	`is_paid` integer NOT NULL,
	`notes` text,
	`repeat` text,
	`remind` text,
	`goal_or_debt` text
);
