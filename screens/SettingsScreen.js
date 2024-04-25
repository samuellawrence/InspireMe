import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from "@react-native-community/slider";
import {SettingsContext} from "../context/SettingsContext";

const SettingsScreen = ({navigation}) => {
    const {quoteFontSize, setQuoteFontSize} = useContext(SettingsContext);
    const {authorFontSize, setAuthorFontSize} = useContext(SettingsContext);
    return (
        <View style={styles.container}>
            <Text style={{fontSize: quoteFontSize, textAlign: 'center'}}>Quote Text Size</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={10}
                maximumValue={50}
                value={quoteFontSize}
                onValueChange={setQuoteFontSize}
            />
            <Text style={{fontSize: authorFontSize, textAlign: 'center'}}>Author Text Size</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={10}
                maximumValue={30}
                value={authorFontSize}
                onValueChange={setAuthorFontSize}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
