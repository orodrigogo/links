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
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"

import { Link } from "@/components/link"
import { Option } from "@/components/option"
import { Categories } from "@/components/categories"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { categories } from "@/utils/categories"

import { linkStorage, LinkStorage } from "@/storage/link-storage"

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categories[0].name)
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage)

  async function getLinks() {
    try {
      const response = await linkStorage.get()

      const filtered = response.filter((link) => link.category === category)
      setLinks(filtered)
    } catch (error) {
      console.log(error)
      Alert.alert("Links", "Não foi possível listar os links.")
    }
  }

  async function handleRemove() {
    Alert.alert("Remover", "Deseja realmente remover?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          await linkStorage.remove(link.id)
          getLinks()
          setShowModal(false)
        },
      },
    ])
  }

  function handleDetails(selected: LinkStorage) {
    setLink(selected)
    setShowModal(true)
  }

  async function handleOpen() {
    await Linking.openURL(link.url)
  }

  useEffect(() => {
    getLinks()
  }, [category])

  useFocusEffect(
    useCallback(() => {
      getLinks()
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories selected={category} onChange={setCategory} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowModal(false)}
            >
              <MaterialIcons name="close" size={20} color={colors.gray[400]} />
            </TouchableOpacity>

            <Text style={styles.name}>{link.name}</Text>
            <Text style={styles.url}>{link.url}</Text>

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
        </View>
      </Modal>
    </View>
  )
}
