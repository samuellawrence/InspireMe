// Import necessary libraries
import React, {useEffect, useState} from 'react';
import {Share, StyleSheet, Text, View} from 'react-native';
import {fetchRandomQuotes, searchQuotes} from "./api"
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import IconTextInput from "./components/IconTextInput";

const App = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [searchText, setSearchText] = useState('');
    const [fetchingQuotes, setFetchingQuotes] = useState(false);

    useEffect(() => {
        if (searchText) {
            search();
        } else {
            fetchQuotes();
        }
        if (quotes.length === 0) return;
        const currentQuote = quotes[quoteIndex];
        if (currentQuote.content) {
            setQuote(currentQuote.content);
            setAuthor(currentQuote.author)
        }
    }, [quoteIndex, quotes, searchText]);

    const search = () => {
        if (searchText && quotes.length - quoteIndex <= 5) {
            setFetchingQuotes(true);
            searchQuotes(searchText)
                .then(data => setQuotes([...quotes, ...data.results]))
                .finally(() => setFetchingQuotes(false));
        }
    }

    const fetchQuotes = () => {
        if (quotes.length - quoteIndex <= 5) {
            setFetchingQuotes(true);
            fetchRandomQuotes()
                .then(data => setQuotes([...quotes, ...data]))
                .finally(() => setFetchingQuotes(false));
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
        if (!fetchingQuotes && quoteIndex < quotes.length - 1) {
            setQuoteIndex(quoteIndex + 1);
        }
    };

    const handleBack = () => {
        if (quoteIndex > 0) {
            setQuoteIndex(quoteIndex - 1);
        }
    };

    const handleSearch = (text) => {
        if (text !== searchText) {
            setQuotes([]);
            setQuoteIndex(0);
            setSearchText(text);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>InspireMe</Text>
                <IconTextInput onSubmit={handleSearch}/>
            </View>
            <View>
                <Text style={styles.quote}>{quote}</Text>
                <Text style={styles.by}>by</Text>
                <Text style={styles.author}>{author}</Text>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <IconButton icon="arrow-back-ios-new" label="Back" onPress={handleBack}
                                disabled={quoteIndex === 0}/>
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
        backgroundColor: '#012237', // Set background color to black
    },
    searchInput: {
        padding: 10,
        color: '#fff',
        width: '100%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: "center",
        color: '#fff',
        marginBottom: 10
    },
    quote: {
        fontSize: 18,
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: 20,
        color: '#fff', // Set text color to white
    },
    by: {
        fontSize: 12,
        verticalAlign: 'middle',
        textAlign: 'center',
        color: '#fff', // Set text color to white
    },
    author: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff', // Set text color to white
    },
    headerContainer: {
        alignItems: "center",
        position: 'absolute',
        top: 40,
        width: '90%'
    },
    searchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // borderWidth:2,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 80,
        // borderWidth:2,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        // borderWidth:2,
    },
});

export default App;
