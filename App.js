// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, PanResponder, Share } from 'react-native';

const App = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');
    const [favoriteQuotes, setFavoriteQuotes] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    useEffect(() => {
        if (quotes.length === 0) return;
        const currentQuote = quotes[quoteIndex];
        setQuote(`${currentQuote.content} - ${currentQuote.author}`);
    }, [quoteIndex, quotes]);

    const fetchQuotes = () => {
        if (quotes.length - quoteIndex <= 18) {
            fetch('https://api.quotable.io/quotes?limit=20')
                .then(response => response.json())
                .then(data => {
                    const newQuotes = [...quotes, ...data.results];
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

    const handleFavorite = () => {
        const currentQuote = quotes[quoteIndex];
        setFavoriteQuotes([...favoriteQuotes, currentQuote]);
    };

    const handleListFavorites = () => {
        console.log('Favorite Quotes:', favoriteQuotes);
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

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {},
            onPanResponderMove: () => {},
            onPanResponderRelease: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (dx > 50) { // Swipe right, move to next quote
                    handleNext();
                } else if (dx < -50) { // Swipe left, move to previous quote
                    handleBack();
                } else if (dy < -50) { // Swipe up, share quote
                    handleShare();
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.quote} {...panResponder.panHandlers}>{quote}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={handleBack} disabled={quoteIndex === 0} />
                <Button title="Next" onPress={handleNext} disabled={quoteIndex === quotes.length - 1} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Share" onPress={handleShare} />
                <Button title="Favorite" onPress={handleFavorite} />
                <Button title="List Favorites" onPress={handleListFavorites} />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});

export default App;
