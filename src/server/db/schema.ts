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
    position: d.varchar("position", { length: 255 }).notNull(),
    greeting: d.text("greeting").notNull(),
    fallback: d.text("fallback").notNull(),
    useWebSearch: d.boolean("useWebSearch").notNull(),
    useDocs: d.boolean("useDocs").notNull(),
    botName: d.varchar("botName", { length: 255 }).notNull(),
    conversationTone: d.varchar("conversationTone", { length: 255 }).notNull(),
    botThesis: d.text("botThesis").notNull(),
    AreaOfExpertise: d.varchar("AreaOfExpertise", { length: 255 }).notNull(),
    CustomExpertise: d.text("CustomExpertise").default("None"),
  }),
  (t) => [index("name_idx").on(t.id)],
);
