import { useState } from "react"
import {
  Alert,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { linkStorage } from "@/storage/link-storage"

import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { Categories } from "@/components/categories"

import { useLinksDatabase } from "@/database/useLinksDatabase"

export default function Add() {
  const [isCreating, setIsCreating] = useState(false)
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const productDatabase = useLinksDatabase()

  async function handleAdd() {
    try {
      if (!category.trim() || !name.trim() || !url.trim()) {
        return Alert.alert(
          "Atenção",
          "Escolha a categoria e preencha todos os campos."
        )
      }

      const isValid = await Linking.canOpenURL(url)

      if (!isValid) {
        return Alert.alert("Link", "Link inválido.")
      }

      setIsCreating(true)

      await productDatabase.create({
        name,
        url,
        category_id: 1,
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
      Alert.alert("Erro", "Não foi possível criar novo link.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Novo" />

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories selected={category} onChange={setCategory} />

      <View style={styles.form}>
        <Pressable onPress={() => router.navigate("/categories")}>
          <Input placeholder="Selecionar categoria" readOnly />
        </Pressable>

        <Input placeholder="Nome" onChangeText={setName} />
        <Input placeholder="Link" onChangeText={setUrl} />
        <Button title="Adicionar" onPress={handleAdd} isLoading={isCreating} />
      </View>
    </View>
  )
}
