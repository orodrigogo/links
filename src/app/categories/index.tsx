import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import {
  CategoryDatabase,
  useCategoriesDatabase,
} from "@/database/useCategoriesDatabase"

import { styles } from "./styles"

import { Input } from "@/components/input"
import { Header } from "@/components/header"
import { Category } from "@/components/category"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"

export default function categories() {
  const [searchByName, setSearchByName] = useState("")
  const [categories, setCategories] = useState<CategoryDatabase[]>([])

  const productDatabase = useCategoriesDatabase()

  function onCategorySelect(id: number) {
    console.log(id)
  }

  async function getCategories() {
    try {
      const response = await productDatabase.searchByName(searchByName)
      setCategories(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [searchByName])

  return (
    <View style={styles.container}>
      <Header title="Categorias" />

      <View style={styles.search}>
        <Input placeholder="Pesquisar" onChangeText={setSearchByName} />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <BouncyCheckbox
              size={24}
              innerIconStyle={{
                borderRadius: 5,
                backgroundColor: colors.gray[800],
              }}
              fillColor={colors.gray[600]}
              iconImageStyle={{
                tintColor: colors.green[300],
                width: 12,
                height: 12,
              }}
              onPress={() => onCategorySelect(item.id)}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Button title="Adicionar" />
      </View>
    </View>
  )
}
