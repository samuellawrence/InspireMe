import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Slider from "@react-native-community/slider";
import {SettingsContext} from "../context/SettingsContext";

const SettingsScreen = ({navigation}) => {
    const {
        quoteFontSize,
        setQuoteFontSize,
        authorFontSize,
        setAuthorFontSize,
        resetFontSizes
    } = useContext(SettingsContext);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, {fontSize: quoteFontSize}]}>Quote Text Size</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={10}
                maximumValue={40}
                value={quoteFontSize}
                onValueChange={setQuoteFontSize}
            />
            <Text style={[styles.label, {fontSize: authorFontSize}]}>Author Text Size</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={10}
                maximumValue={40}
                value={authorFontSize}
                onValueChange={setAuthorFontSize}
            />
            <Button title="Reset to Default" onPress={resetFontSizes}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#012237',
    },
    label: {
        textAlign: 'center',
        color: "white"
    }
});

export default SettingsScreen;
