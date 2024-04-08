const moment = require('moment');

const countWords = (str) => {
    if (typeof str !== 'string') {
        return 0;
    }
    
    // Remove leading and trailing whitespaces
    const trimmedStr = str.trim();
    
    // If the string is empty, return 0 words
    if (!trimmedStr) {
        return 0;
    }
    
    // Split the string by whitespaces
    const words = trimmedStr.split(/\s+/);
    
    // Filter out empty strings and count the remaining words
    const nonEmptyWords = words.filter(word => word.length > 0);
    const wordCount = nonEmptyWords.length;
    
    return wordCount; // Return the word count
};

// Get the current date
const currentDate = new Date();

// Calculate the date 7 days ago
const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 7);

// Format the date if needed (e.g., to YYYY-MM-DD format)
const formattedDate = sevenDaysAgo.toISOString().split('T')[0];
 // Output: YYYY-MM-DD format of the date 7 days ago



module.exports = {
    countWords,
    today: moment().format('YYYY-MM-DD'),
};
module.exports.fromdate = formattedDate;