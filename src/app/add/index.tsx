import { useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { linkStorage } from "@/storage/link-storage"

import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Categories } from "@/components/categories"

export default function Add() {
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  async function handleAdd() {
    try {
      if (!category.trim() || !name.trim() || !url.trim()) {
        return Alert.alert(
          "Atenção",
          "Escolha a categoria e preencha todos os campos."
        )
      }

      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      })

      Alert.alert("Sucesso", "Novo link adicionado!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar novo link.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Categories selected={category} onChange={setCategory} />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} />
        <Input placeholder="Link" onChangeText={setUrl} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  )
}
