const { getData } = require('./getData');
const { sendEmail } = require('./sendEmail');
const { inquiryApi, inquiryReplyApi, inquiryCookie, Inquirytext_1, Inquirytext_2 } = require('../config');
const nodemailer = require('nodemailer');
const axios = require('axios');

const inquirylogic = async () => {
    const inquiryData = [];
    
    for (let pageNumber = 1; ; pageNumber++) {
        const data = await getData({pageNumber, api: inquiryApi });
        if (!data || !data.length) {
            break;
        }
        inquiryData.push(...data);
    }
    inquiryData.forEach(inquiry => {
        
        



        const res = inquiry.responded;
        if(res !== 1){
            function extractTextInSingleQuotes(str) {
                const regex = /'([^']+)'/;
                const match = str.match(regex);
                return match ? match[1] : null;
            }
            
            // Example usage:
    
            const product = extractTextInSingleQuotes(inquiry.message);
    
            console.log(product);
            const buyerEmail_customer = inquiry.sender_email;
            const buyerEmail_me = "info@highlighthk.com";
            const subject = `${product} inquiry`;
            const text = Inquirytext_1 + ` ${product} ` + Inquirytext_2;
            sendEmail({ buyerEmail_customer,buyerEmail_me, subject, text });
   
            const apiUrl = inquiryReplyApi;
            const requestData = {
                rfi_id: `${inquiry.rfi_id}`, // Replace with your actual key-value pairs
                message: text,
                template_type: 'buyer_temp'
            };

            // Optional: If your API requires headers or cookies, you can include them in the config object
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'User-Agent': 'PostmanRuntime/7.36.3',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Referer': `https://www.tradeindia.com/my-tradeindia/inquiries/inquiry.html?rfi_id=${inquiry.rfi_id}&inquiry_source=PHONE_INQUIRY&section=Inbox&old=&num_data=&page_no=`,// Adjust the content type based on your API requirements
                    'Cookie': inquiryCookie
                    // Replace with your actual cookie value if needed
                },
            };
            axios.post(apiUrl, requestData, config)
              .then(response => {
                console.log('Response:', response.data);
              })
              .catch(error => {
                console.error('Error:', error.message);
              });
        }else{
            console.log("You already sent the reply for inquiry");
        };
    });
};

module.exports = { inquirylogic };