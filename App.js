// Import necessary libraries
import React, {useEffect, useState} from 'react';
import {Share, StyleSheet, Text, View} from 'react-native';
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";

const App = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        fetchQuotes();
        if (quotes.length === 0) return;
        const currentQuote = quotes[quoteIndex];
        setQuote(`${currentQuote.content} - ${currentQuote.author}`);
    }, [quoteIndex, quotes]);

    const fetchQuotes = () => {
        if (quotes.length - quoteIndex <= 5) {
            fetch('https://api.quotable.io/quotes/random?limit=20')
                .then(response => response.json())
                .then(data => {
                    const newQuotes = [...quotes, ...data];
                    setQuotes(newQuotes);
                })
                .catch(error => {
                    console.error('Error fetching quotes:', error);
                });
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: quote,
            });
        } catch (error) {
            console.error('Error sharing quote:', error);
        }
    };

    const handleNext = () => {
        if (quoteIndex < quotes.length - 1) {
            setQuoteIndex(quoteIndex + 1);
        }
    };

    const handleBack = () => {
        if (quoteIndex > 0) {
            setQuoteIndex(quoteIndex - 1);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.quote}>{quote}</Text>
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <IconButton icon="arrow-back-ios-new" label="Back" onPress={handleBack}/>
                    <CircleButton onPress={handleShare}/>
                    <IconButton icon="arrow-forward-ios" label="Next" onPress={handleNext}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Set background color to black
    },
    quote: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
        color: '#fff', // Set text color to white
    },
    footerContainer: {
        position: 'absolute',
        bottom: 80
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row'
    }

});

export default App;
