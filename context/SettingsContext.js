import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext({quoteFontSize: 20, authorFontSize: 18});

export const SettingsProvider = ({children}) => {
    const [quoteFontSize, setQuoteFontSize] = useState(20);
    const [authorFontSize, setAuthorFontSize] = useState(20);

    useEffect(() => {
        const loadSettings = async () => {
            const storedQuoteFontSize = await AsyncStorage.getItem('quoteFontSize');
            if (storedQuoteFontSize) setQuoteFontSize(parseFloat(storedQuoteFontSize));

            const storedAuthorFontSize = await AsyncStorage.getItem('authorFontSize');
            if (storedAuthorFontSize) setAuthorFontSize(parseFloat(storedAuthorFontSize));
        };

        loadSettings();
    }, []);

    const handleQuoteFontSizeChange = async (newSize) => {
        setQuoteFontSize(newSize);
        await AsyncStorage.setItem('quoteFontSize', newSize.toString());
    };

    const handleAuthorFontSizeChange = async (newSize) => {
        setAuthorFontSize(newSize);
        await AsyncStorage.setItem('authorFontSize', newSize.toString());
    }

    return (
        <SettingsContext.Provider value={{
            quoteFontSize,
            setQuoteFontSize: handleQuoteFontSizeChange,
            authorFontSize,
            setAuthorFontSize: handleAuthorFontSizeChange
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
