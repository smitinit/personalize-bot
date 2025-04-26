import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `banking-bot_${name}`);

export const bot = createTable(
  "personalise_data",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),

    botId: d.varchar("botId", { length: 255 }).unique(),
    botavatarURL: d.varchar("botavatar", { length: 255 }).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    apiKey: d.varchar("apiKey", { length: 255 }).notNull().unique(),
  }),
  (t) => [index("name_idx").on(t.id)],
);
