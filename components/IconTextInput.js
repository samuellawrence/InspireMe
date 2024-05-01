import {StyleSheet, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";

export default function IconTextInput({onSubmit, onCancel}) {
    const [searchText, setSearchText] = useState('');
    const [isAuthorSearch, setIsAuthorSearch] = useState(false);
    const textInputRef = useRef(null);

    const handleClear = () => {
        setSearchText('');
        onCancel();
    };

    const toggleSearchMode = () => {
        setIsAuthorSearch(!isAuthorSearch); // Toggle search mode
        setSearchText(''); // Clear search text when toggling
    };

    return (
        <View style={styles.searchSection}>
            <MaterialIcons name={isAuthorSearch ? "person" : "search"} style={styles.searchIcon} size={20}
                           onPress={toggleSearchMode}/>
            <TextInput
                ref={textInputRef}
                style={styles.input}
                placeholder={isAuthorSearch ? "Search by author..." : "Search by quote..."}
                placeholderTextColor='#424242'
                maxLength={80}
                onChangeText={text => setSearchText(text)}
                value={searchText}
                onSubmitEditing={() => onSubmit(searchText, isAuthorSearch)}
            />
            <MaterialIcons name="clear" style={styles.searchIcon} size={20} onPress={handleClear}/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        borderRadius: 50,
        borderCurve: 'circular',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 48,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    searchInput: {
        color: '#fff',
        borderColor: '#012237',
        borderWidth: 2,
        fontSize: 15,
        width: '80%'
    },
    searchContainer: {
        padding: 2,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#fff',
    },
});
