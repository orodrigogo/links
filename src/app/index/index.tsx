import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"
import { DrawerToggleButton } from "@react-navigation/drawer"
import {
  Alert,
  View,
  Text,
  Modal,
  Image,
  Linking,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native"

import { Link } from "@/components/link"
import { Input } from "@/components/input"
import { Option } from "@/components/option"
import { Category } from "@/components/category"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import {
  CategoryDatabase,
  useCategoriesDatabase,
} from "@/database/useCategoriesDatabase"

import {
  LinkDatabase,
  LinkShowDatabase,
  useLinksDatabase,
} from "@/database/useLinksDatabase"

export default function Index() {
  const [showModal, setShowModal] = useState(false)

  const [links, setLinks] = useState<LinkDatabase[]>([])
  const [searchLinkByName, setSearchByName] = useState("")
  const [categories, setCategories] = useState<CategoryDatabase[]>([])

  const [category, setCategory] = useState<CategoryDatabase | null>(null)
  const [link, setLink] = useState<LinkShowDatabase | null>(null)

  const categoriesDatabase = useCategoriesDatabase()
  const linksDatabase = useLinksDatabase()

  const { t } = useTranslation("translation", { keyPrefix: "index" })

  async function getLinks() {
    try {
      const response = await linksDatabase.searchByName(
        searchLinkByName,
        category?.id
      )
      setLinks(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Links", t("alert_error_get_links"))
    }
  }

  async function handleEdit() {
    setShowModal(false)
    router.navigate({ pathname: "/save", params: { id: link?.id } })
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

  useFocusEffect(
    useCallback(() => {
      getCategories()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      getLinks()
    }, [category, searchLinkByName])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DrawerToggleButton tintColor={colors.green[300]} />

        <TouchableOpacity onPress={() => router.navigate("/save")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Input
          placeholder={t("input_search_placeholder")}
          onChangeText={setSearchByName}
        />
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
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>{t("flatlist_links_empty")}</Text>
        )}
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
                name={t("option_edit_name")}
                icon="edit"
                variant="secondary"
                onPress={handleEdit}
              />

              <Option
                name={t("option_open_name")}
                icon="language"
                onPress={handleOpen}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
