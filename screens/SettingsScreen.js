import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Slider from "@react-native-community/slider";
import {SettingsContext} from "../context/SettingsContext";

const minimumValue = 10;
const maximumValue = 40;
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
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={quoteFontSize}
                onValueChange={setQuoteFontSize}
            />
            <Text style={[styles.label, {fontSize: authorFontSize}]}>Author Text Size</Text>
            <Slider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={authorFontSize}
                onValueChange={setAuthorFontSize}
            />
            <View style={styles.resetButtonContainer}>
                <Button title="Reset to Default" onPress={resetFontSizes}/>
            </View>
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
    },
    slider: {
        width: 200,
        height: 40
    },
    resetButtonContainer: {
        paddingTop: 15
    }
});

export default SettingsScreen;
