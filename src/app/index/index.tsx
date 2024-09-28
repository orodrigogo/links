import { useCallback, useEffect, useState } from "react"
import {
  Alert,
  View,
  Text,
  Modal,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"

import { Link } from "@/components/link"
import { Option } from "@/components/option"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { linkStorage, LinkStorage } from "@/storage/link-storage"
import { Category } from "@/components/category"

import {
  CategoryDatabase,
  useCategoriesDatabase,
} from "@/database/useCategoriesDatabase"
import {
  LinkDatabase,
  LinkShowDatabase,
  useLinksDatabase,
} from "@/database/useLinksDatabase"
import { Input } from "@/components/input"

export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [links, setLinks] = useState<LinkDatabase[]>([])
  const [category, setCategory] = useState<CategoryDatabase | null>(null)
  const [categories, setCategories] = useState<CategoryDatabase[]>([])
  const [link, setLink] = useState<LinkShowDatabase | null>(null)
  const [searchLinkByName, setSearchByName] = useState("")

  const categoriesDatabase = useCategoriesDatabase()
  const linksDatabase = useLinksDatabase()

  async function getLinks() {
    try {
      const response = await linksDatabase.searchByName(
        searchLinkByName,
        category?.id
      )
      setLinks(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Links", "Não foi possível listar os links.")
    }
  }

  async function handleRemove() {
    if (!link) {
      return
    }

    Alert.alert("Remover", "Deseja realmente remover?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          await linksDatabase.remove(link.id)
          getLinks()
          setShowModal(false)
        },
      },
    ])
  }

  async function handleDetails(selected: LinkDatabase) {
    const response = await linksDatabase.show(selected.id)

    setLink(response)
    setShowModal(true)
  }

  async function handleOpen() {
    if (link) {
      await Linking.openURL(link.url)
    }
  }

  async function getCategories() {
    try {
      const response = await categoriesDatabase.searchByName("")
      setCategories(response)
    } catch (error) {
      console.log(error)
    }
  }

  function handleCategorySelect(selected: CategoryDatabase) {
    if (category?.id === selected.id) {
      return setCategory(null)
    }

    setCategory(selected)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getLinks()
    }, [category, searchLinkByName])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Input placeholder="Pesquisar" onChangeText={setSearchByName} />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Category
            name={item.name}
            isSelected={item.id === category?.id}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={links}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent animationType="slide" visible={showModal}>
        <Pressable style={styles.modal} onPress={() => setShowModal(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.category}>{link?.category_name}</Text>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>{link?.name}</Text>

            <Text style={styles.url} numberOfLines={2}>
              {link?.url}
            </Text>

            <View style={styles.footer}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
