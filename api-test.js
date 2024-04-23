// Example array of quotes for testing
const localQuotes = [
    {content: "Life is what happens when you're busy making other plans.", author: "John Lennon"},
    {content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney"},
    {content: "Life is really simple, but we insist on making it complicated.", author: "Confucius"},
    // Add as many quotes as you like for testing
];

// Adjusted fetchRandomQuotes to return local quotes
export const fetchRandomQuotes = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(localQuotes), 100); // Simulate async operation with setTimeout
    });
};

// Adjusted searchQuotes to filter local quotes based on searchText
export const searchQuotes = (searchText) => {
    const searchLower = searchText.toLowerCase();
    const filteredQuotes = localQuotes.filter(quote =>
        quote.content.toLowerCase().includes(searchLower) ||
        quote.author.toLowerCase().includes(searchLower)
    );

    return new Promise(resolve => {
        setTimeout(() => resolve({results: filteredQuotes}), 100); // Simulate async operation
    });
};
