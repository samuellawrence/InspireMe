import {Pressable, StyleSheet, Text} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default function IconButton({icon, label, disabled = false, size = 24, onPress}) {
    return (
        <Pressable style={styles.iconButton} onPress={onPress} disabled={disabled}>
            <MaterialIcons disabled={disabled} name={icon} size={size} color={disabled ? 'gray' : "#fff"}/>
            {label && <Text disabled={disabled}
                            style={disabled ? styles.iconButtonLabelDisabled : styles.iconButtonLabel}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
    iconButtonLabelDisabled: {
        color: 'gray',
        marginTop: 12,
    }
})
