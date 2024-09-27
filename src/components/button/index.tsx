import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.green[900]} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
