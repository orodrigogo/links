import { useSQLiteContext } from "expo-sqlite/next"

export type CategoryDatabase = {
  id: number
  name: string
}

export function useCategoriesDatabase() {
  const database = useSQLiteContext()

  async function searchByName(name: string) {
    try {
      const query = "SELECT id, name FROM categories WHERE name LIKE ?"

      const response = await database.getAllAsync<CategoryDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function create({ name }: { name: string }) {
    const statement = await database.prepareAsync(
      "INSERT INTO categories (name) VALUES ($name)"
    )

    try {
      const result = await statement.executeAsync({
        $name: name,
      })

      const insertedRowId = result.lastInsertRowId.toString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    const statement = await database.prepareAsync(
      "DELETE FROM shopping WHERE id = $id"
    )

    try {
      await statement.executeAsync({ $id: id })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  return { searchByName, create, remove }
}
