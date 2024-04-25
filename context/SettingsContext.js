import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const defaultQuoteFontSize = 20;
    const defaultAuthorFontSize = 16;

    const [quoteFontSize, setQuoteFontSize] = useState(defaultQuoteFontSize);
    const [authorFontSize, setAuthorFontSize] = useState(defaultAuthorFontSize);

    useEffect(() => {
        loadFontSizes();
    }, []);

    const loadFontSizes = async () => {
        const storedQuoteFontSize = await AsyncStorage.getItem('quoteFontSize');
        const storedAuthorFontSize = await AsyncStorage.getItem('authorFontSize');
        if (storedQuoteFontSize) setQuoteFontSize(parseFloat(storedQuoteFontSize));
        if (storedAuthorFontSize) setAuthorFontSize(parseFloat(storedAuthorFontSize));
    };

    const resetFontSizes = async () => {
        setQuoteFontSize(defaultQuoteFontSize);
        setAuthorFontSize(defaultAuthorFontSize);
        await AsyncStorage.setItem('quoteFontSize', defaultQuoteFontSize.toString());
        await AsyncStorage.setItem('authorFontSize', defaultAuthorFontSize.toString());
    };

    return (
        <SettingsContext.Provider
            value={{quoteFontSize, setQuoteFontSize, authorFontSize, setAuthorFontSize, resetFontSizes}}>
            {children}
        </SettingsContext.Provider>
    );
};
