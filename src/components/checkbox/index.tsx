import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

type Props = TouchableOpacityProps & {
  title: string
  isChecked?: boolean
  onEdit?: () => void
}

export function Checkbox({ title, isChecked = false, onEdit, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <MaterialIcons
        name={isChecked ? "check-box" : "check-box-outline-blank"}
        size={28}
        color={isChecked ? colors.green[300] : colors.gray[100]}
      />

      <Text style={styles.name}>{title}</Text>

      <TouchableOpacity onPress={onEdit}>
        <MaterialIcons name="edit" size={20} color={colors.green[300]} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
