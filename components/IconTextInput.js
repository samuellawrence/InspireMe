import {StyleSheet, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import IconButton from "./IconButton";

export default function IconTextInput({onSubmit}) {
    const [searchText, setSearchText] = useState('');
    const textInputRef = useRef(null);

    const handleFocus = () => {
        textInputRef.current.focus();
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                ref={textInputRef}
                style={styles.searchInput}
                placeholder="Search by phrase..."
                placeholderTextColor='#fff'
                onChangeText={text => setSearchText(text)}
                value={searchText}
                onSubmitEditing={() => onSubmit(searchText)}
            />
            <IconButton icon="search" onPress={handleFocus}/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        color: '#fff',
        borderWidth: 2,
        fontSize: 15,
        width: '80%'
    },
    searchContainer: {
        padding: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#fff',
    },
});