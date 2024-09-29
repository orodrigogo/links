import { useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
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

  const formScheme = z.object({
    name: z
      .string({ message: "Informe o nome da categoria" })
      .min(1, { message: "Informe o nome da categoria" }),
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

    Alert.alert("Remover", "Deseja realmente remover?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
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

      Alert.alert("Sucesso", "Salvo com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      setIsLoading(false)

      if (error instanceof ZodError) {
        return Alert.alert("Atenção", error.errors[0].message)
      }

      Alert.alert("Erro", "Não foi possível criar novo link.")
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

        <Text style={styles.title}>Categoria</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Nome"
          onChangeText={setName}
          defaultValue={categorySelected?.name}
        />
        <Button title="Salvar" onPress={handleSave} isLoading={isLoading} />
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.remove}>Remover</Text>
      </TouchableOpacity>
    </View>
  )
}
