import { useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  Keyboard,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { z, ZodError } from "zod"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { Input } from "@/components/input"
import { Button } from "@/components/button"

import { useLinksDatabase } from "@/database/useLinksDatabase"

import {
  CategoryDatabase,
  useCategoriesDatabase,
} from "@/database/useCategoriesDatabase"

export default function Add() {
  const [searchCategoryByName, setSearchCategoryByName] = useState("")
  const [categories, setCategories] = useState<CategoryDatabase[]>([])
  const [modaIsOpen, setModalIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [category, setCategory] = useState<CategoryDatabase>()
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const categoriesDatabase = useCategoriesDatabase()
  const linksDatabase = useLinksDatabase()

  const formScheme = z.object({
    category: z.number({ message: "Selecione uma categoria para o link" }),
    name: z
      .string({ message: "Informe o nome do link" })
      .length(1, { message: "Informe o nome do link" }),
    url: z
      .string({ message: "Informe a URL" })
      .url({ message: "URL inválida" }),
  })

  async function handleAdd() {
    try {
      formScheme.parse({ category: category?.id, name: name.trim(), url })

      setIsCreating(true)

      await linksDatabase.create({
        name: name.trim(),
        url,
        category_id: category!.id,
      })

      setIsCreating(false)

      Alert.alert("Sucesso", "Novo link adicionado!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      setIsCreating(false)

      if (error instanceof ZodError) {
        return Alert.alert("Atenção", error.errors[0].message)
      }

      Alert.alert("Erro", "Não foi possível criar novo link.")
      console.log(error)
    }
  }

  async function getCategories() {
    try {
      const response = await categoriesDatabase.searchByName(
        searchCategoryByName
      )
      setCategories(response)
    } catch (error) {
      console.log(error)
    }
  }

  function onCategorySelect(categorySelected: CategoryDatabase) {
    setModalIsOpen(false)
    setCategory(categorySelected)
  }

  useEffect(() => {
    getCategories()
  }, [searchCategoryByName])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Selecionar categoria"
          onPressIn={() => setModalIsOpen(true)}
          onFocus={() => Keyboard.dismiss()}
          showSoftInputOnFocus={false}
          value={category?.name}
        />
        <Input placeholder="Nome" onChangeText={setName} />
        <Input placeholder="Link" onChangeText={setUrl} />
        <Button title="Adicionar" onPress={handleAdd} isLoading={isCreating} />
      </View>

      <Modal visible={modaIsOpen}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Categoria</Text>
            <TouchableOpacity onPress={() => setModalIsOpen(false)}>
              <MaterialIcons name="close" size={24} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>

          <View style={styles.search}>
            <Input
              placeholder="Pesquisar"
              onChangeText={setSearchCategoryByName}
            />
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
                  isChecked={item.id === category?.id}
                  onPress={() => onCategorySelect(item)}
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            )}
            contentContainerStyle={styles.categoriesContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  )
}
