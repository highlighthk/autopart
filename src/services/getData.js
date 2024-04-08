require('dotenv').config();
const axios = require('axios');

const getData = async ({ pageNumber,api }) => {
    try {
        const response = await axios.get(`${api}${pageNumber}`);
        const data = response.data;
        return  data;

    } catch (error) {
        console.error('Error fetching or processing inquiries:', error.message);
    }
}

module.exports = { getData };