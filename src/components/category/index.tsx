import { Text, Pressable, PressableProps } from "react-native"

import { styles } from "./styles"

type Props = PressableProps & {
  name: string
  isSelected: boolean
}

export function Category({ name, isSelected, ...rest }: Props) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  )
}
