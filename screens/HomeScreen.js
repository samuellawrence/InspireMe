import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Share, StyleSheet, Text, View} from 'react-native';
import {fetchRandomQuotes, searchQuotes} from "../api-test"
// import {fetchRandomQuotes, searchQuotes} from "../api"
import IconButton from "../components/IconButton";
import CircleButton from "../components/CircleButton";
import IconTextInput from "../components/IconTextInput";
import {SettingsContext} from "../context/SettingsContext";

const HomeScreen = ({navigation}) => {

    const {quoteFontSize, authorFontSize} = useContext(SettingsContext);

    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [authorSearch, setAuthorSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [fetchingQuotes, setFetchingQuotes] = useState(false);
    const [forceFetchingQuotes, setForceFetchingQuotes] = useState(false);

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
    }, [quoteIndex, quotes, searchText, forceFetchingQuotes]);

    const search = () => {
        if (searchText && quotes.length - quoteIndex <= 5) {
            setFetchingQuotes(true);
            searchQuotes(searchText, authorSearch)
                .then(data => setQuotes([...quotes, ...data.results]))
                .finally(() => setFetchingQuotes(false));
        }
    }

    const fetchQuotes = () => {
        if (quotes.length - quoteIndex <= 5 || forceFetchingQuotes) {
            setFetchingQuotes(true);
            fetchRandomQuotes()
                .then(data => setQuotes([...quotes, ...data]))
                .finally(() => {
                    setFetchingQuotes(false);
                    setForceFetchingQuotes(false);
                });
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${quote}\n--${author}`,
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

    const handleSearch = (text, isAuthorSearch) => {
        if (text !== searchText || isAuthorSearch !== authorSearch) {
            setQuotes([]);
            setQuoteIndex(0);
            setSearchText(text);
            setAuthorSearch(isAuthorSearch);
        }
    };

    const handelCancelSearch = () => {
        setQuotes([]);
        setQuoteIndex(0);
        setSearchText('');
        setForceFetchingQuotes(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>InspireMe</Text>
                    <IconButton icon="settings" size={20} onPress={() => navigation.navigate('Settings')}></IconButton>
                </View>
                <IconTextInput onSubmit={handleSearch} onCancel={handelCancelSearch}/>
            </View>
            {
                fetchingQuotes ? (
                    <ActivityIndicator size="large" color="#00ff000"/>
                ) : (
                    <View>
                        <Text style={[styles.quote, {fontSize: Number(quoteFontSize)}]}>{quote}</Text>
                        <Text style={[styles.author, {fontSize: Number(authorFontSize)}]}>--{author}</Text>
                    </View>
                )
            }
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
    titleContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingLeft: 35,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    quote: {
        fontSize: 20,
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: 20,
        color: '#fff', // Set text color to white
    },
    author: {
        fontSize: 18,
        textAlign: 'right',
        color: '#fff', // Set text color to white
        marginRight: 20,
        fontStyle: "italic"
    },
    headerContainer: {
        top: 40,
        alignItems: "center",
        position: 'absolute',
        width: "100%",
        paddingHorizontal: 10
    },
    searchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 80,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default HomeScreen;
