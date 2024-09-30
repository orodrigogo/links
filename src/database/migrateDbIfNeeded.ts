import { type SQLiteDatabase } from "expo-sqlite"
import { getLocales } from "expo-localization"

const language = getLocales()[0].languageCode ?? "pt"

export async function migrateDbIfNeeded(database: SQLiteDatabase) {
  try {
    const DATABASE_VERSION = 1

    const currentDbVersion = await database.getFirstAsync<{
      user_version: number
    }>("PRAGMA user_version")

    if (!currentDbVersion) {
      return
    }

    if (currentDbVersion?.user_version >= DATABASE_VERSION) {
      return
    }

    if (currentDbVersion.user_version === 0) {
      await database.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;  
    `)

      await database.execAsync(`        
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        url TEXT NOT NULL, 

        category_id INTEGER NOT NULL, 

        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
      );
  `)

      await database.execAsync(`
    INSERT OR IGNORE INTO categories (id, name) VALUES 
      (1, '${language === "pt" ? "Vídeos" : "Videos"}'),
      (2, '${language === "pt" ? "Artigos" : "Articles"}'),
      (3, '${language === "pt" ? "Sites" : "Websites"}')
  `)

      await database.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)
    }
  } catch (error) {
    console.log("ERROR_DATABASE: error executing database migration.", error)
  }
}
