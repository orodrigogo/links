import { useCallback, useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
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
import { Checkbox } from "@/components/checkbox"

export default function Save() {
  const [searchCategoryByName, setSearchCategoryByName] = useState("")
  const [categories, setCategories] = useState<CategoryDatabase[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [category, setCategory] = useState<CategoryDatabase | null>(null)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const categoriesDatabase = useCategoriesDatabase()
  const linksDatabase = useLinksDatabase()
  const params = useLocalSearchParams()

  const { t } = useTranslation("translation", { keyPrefix: "save" })

  const formScheme = z.object({
    category: z.number({ message: t("validation_required_category") }),
    name: z
      .string({ message: t("validation_required_name") })
      .min(1, { message: t("validation_required_name") }),
    url: z
      .string({ message: t("validation_required_url") })
      .url({ message: t("validation_invalid_url") }),
  })

  async function handleSave() {
    try {
      formScheme.parse({ category: category?.id, name: name.trim(), url })

      setIsSaving(true)

      if (params.id) {
        await linksDatabase.update({
          id: Number(params.id),
          name: name.trim(),
          url,
          category_id: category!.id,
        })
      } else {
        await linksDatabase.create({
          name: name.trim(),
          url,
          category_id: category!.id,
        })
      }

      setIsSaving(false)

      Alert.alert(
        t("alert_save_success_title"),
        t("alert_save_success_message"),
        [
          {
            text: "Ok",
            onPress: () => router.back(),
          },
        ]
      )
    } catch (error) {
      setIsSaving(false)

      if (error instanceof ZodError) {
        return Alert.alert("Atenção", error.errors[0].message)
      }

      Alert.alert(t("alert_save_error_title"), t("alert_save_error_message"))
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

  function handleCategorySelect(categorySelected: CategoryDatabase) {
    setModalIsOpen(false)
    setCategory(categorySelected)
    setSearchCategoryByName("")
  }

  function handleNewCategory() {
    router.navigate("/new-category")
    setModalIsOpen(false)
  }

  function handleCategoryEdit(id: number) {
    router.navigate({ pathname: "/new-category", params: { id } })
    setModalIsOpen(false)
    setCategory(null)
  }

  async function handleRemove() {
    if (!params.id) {
      return
    }

    Alert.alert(t("alert_remove_title"), t("alert_remove_message"), [
      { style: "cancel", text: t("alert_remove_cancel") },
      {
        text: t("alert_remove_confirm"),
        onPress: async () => {
          linksDatabase.remove(Number(params.id))
          router.back()
        },
      },
    ])
  }

  async function getLinkDetails(id: number) {
    try {
      const response = await linksDatabase.show(id)

      if (response) {
        setName(response.name)
        setUrl(response.url)
        setCategory({ id: response.category_id, name: response.category_name })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params.id) {
      getLinkDetails(Number(params.id))
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      getCategories()
    }, [searchCategoryByName])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        {params.id ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleRemove}>
            <MaterialIcons name="delete" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.title}>{t("text_title")}</Text>
        )}
      </View>

      <View style={styles.form}>
        <Input
          placeholder={t("select_category_placeholder")}
          onPressIn={() => setModalIsOpen(true)}
          onFocus={() => Keyboard.dismiss()}
          showSoftInputOnFocus={false}
          value={category?.name}
        />

        <Input
          placeholder={t("input_name_placeholder")}
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder={t("input_link_placeholder")}
          value={url}
          onChangeText={setUrl}
        />
        <Button
          title={t("button_salve_title")}
          onPress={handleSave}
          isLoading={isSaving}
        />
      </View>

      <Modal visible={modalIsOpen}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{t("text_categories_title")}</Text>
            <TouchableOpacity onPress={() => setModalIsOpen(false)}>
              <MaterialIcons name="close" size={24} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>

          <View style={styles.search}>
            <Input
              placeholder={t("input_search_placeholder")}
              onChangeText={setSearchCategoryByName}
            />
          </View>

          <FlatList
            data={categories}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Checkbox
                title={item.name}
                isChecked={item.id === category?.id}
                onPress={() => handleCategorySelect(item)}
                onEdit={() => handleCategoryEdit(item.id)}
              />
            )}
            contentContainerStyle={styles.categoriesContent}
            showsVerticalScrollIndicator={false}
          />

          <Button
            title={t("button_category_add_title")}
            onPress={handleNewCategory}
          />
        </View>
      </Modal>
    </View>
  )
}
