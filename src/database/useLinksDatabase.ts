import { useSQLiteContext } from "expo-sqlite/next"

export type LinkDatabase = {
  id: number
  name: string
  url: string
  category_id: number
}

export type LinkShowDatabase = LinkDatabase & {
  category_name: string
}

export function useLinksDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<LinkDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO links (name, url, category_id) VALUES ($name, $url, $category_id)"
    )

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $url: data.url,
        $category_id: data.category_id,
      })

      const insertedRowId = result.lastInsertRowId.toString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByName(name: string, categoryId?: number) {
    try {
      let query

      query = "SELECT * FROM links WHERE name LIKE ?"

      if (categoryId) {
        query =
          "SELECT * FROM links WHERE name LIKE ? AND category_id = " +
          categoryId
      }

      const response = await database.getAllAsync<LinkDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = `
      SELECT l.id, l.name, l.url, l.category_id, c.name AS category_name FROM links AS l
      INNER JOIN categories AS c ON l.category_id = c.id
      WHERE l.id = ${id}
      `

      const response = await database.getFirstAsync<LinkShowDatabase>(query)
      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: LinkDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE links SET name = $name, url = $url, category_id = $category_id WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $url: data.url,
        $category_id: data.category_id,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    const statement = await database.prepareAsync(
      "DELETE FROM links WHERE id = $id"
    )

    try {
      await statement.executeAsync({ $id: id })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  return { create, searchByName, show, update, remove }
}
