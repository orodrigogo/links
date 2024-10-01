import { useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import { z, ZodError } from "zod"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { Input } from "@/components/input"
import { Button } from "@/components/button"

import {
  CategoryDatabase,
  useCategoriesDatabase,
} from "@/database/useCategoriesDatabase"

export default function NewCategory() {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [categorySelected, setCategorySelected] =
    useState<CategoryDatabase | null>(null)

  const categoriesDatabase = useCategoriesDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  const { t } = useTranslation("translation", { keyPrefix: "new_category" })

  const formScheme = z.object({
    name: z
      .string({ message: t("validation_category_name_required") })
      .min(1, { message: t("validation_category_name_required") }),
  })

  async function getCategoryById() {
    try {
      if (params.id) {
        const response = await categoriesDatabase.show(Number(params.id))
        setCategorySelected(response)
      }
    } catch (error) {
      console.log(error)
    }
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
          await categoriesDatabase.remove(Number(params.id))
          router.back()
        },
      },
    ])
  }

  async function handleSave() {
    try {
      formScheme.parse({ name: name.trim() })

      setIsLoading(true)

      if (params.id) {
        await categoriesDatabase.update({
          id: Number(params.id),
          name: name.trim(),
        })
      } else {
        await categoriesDatabase.create({
          name: name.trim(),
        })
      }

      setIsLoading(false)

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
      setIsLoading(false)

      if (error instanceof ZodError) {
        return Alert.alert(
          t("alert_save_error_validation_title"),
          error.errors[0].message
        )
      }

      Alert.alert(t("alert_save_error_title"), t("alert_save_error_message"))
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoryById()
  }, [params])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>{t("text_category")}</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder={t("input_name_placeholder")}
          onChangeText={setName}
          defaultValue={categorySelected?.name}
        />
        <Button
          title={t("button_salve_title")}
          onPress={handleSave}
          isLoading={isLoading}
        />
      </View>

      {params.id && (
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.remove}>{t("button_remove_title")}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
