const { getData } = require('./getData');
const { sendEmail } = require('./sendEmail');
const { buyleadsApi, buyleadReplyApi, buyleadsRespondedApi, buyleadCookie, Buyleadtext_1, Buyleadtext_2 } = require('../config');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { countWords } = require('../utils');

const buyleadlogic = async () => {
    const buyleadsRespondedData = [];
    
    const buyleadsData = [];
    for (let pageNumber = 1; ; pageNumber++) {
        const data= await getData({pageNumber, api: buyleadsApi });
        if (!data || !data.length) {
            break;
        }
        buyleadsData.push(...data);
    }
    for (let pageNumber = 1; ; pageNumber++) {
        const  data = await getData({ pageNumber, api: buyleadsRespondedApi });
        if (!data || !data.length) {
            break;
        }
        buyleadsRespondedData.push(...data);
    }
    let text;
    
    buyleadsData.forEach(buylead => {
     
        let flg = false;
        const id = `${buylead.profile_id}_${buylead.userid}_${buylead.lead_id}_${buylead.category_id}`;
        buyleadsRespondedData.forEach(buyleadResponded =>{
         const respondid = `${buyleadResponded.profile_id}_${buyleadResponded.userid}_${buyleadResponded.lead_id}_${buyleadResponded.category_id}`;
         if(id === respondid){
            flg = true;
         }
        });
        if(flg === false) {
            const buyerEmail_customer = buylead.sender_email;
            const buyerEmail_me = "info@highlighthk.com";
          
            let product = "";
            const str = buylead.product_name;
            const wordCount = countWords(str);
            if (wordCount < 4) {
                product = str;
            } else {
                const match = str.match(/'([^']+)'/);
                if (match) {
                    product = match[1];
                } else {
                    console.log("There is no content");
                }
            }
            
            text = Buyleadtext_1 + ` ${product} ` + Buyleadtext_2;
            const subject = `${product} buylead`;
            console.log("text",text);
            if (buyerEmail_customer !== "NA") {
                sendEmail({ buyerEmail_customer,buyerEmail_me, subject, text });
         
            }
            const apiUrl = buyleadReplyApi;
            const profile_id = buylead.profile_id;
            
            const user_id = buylead.userid;
            const lead_id = buylead.lead_id;
            const lead_type = buylead.lead_type;
            const category_id = buylead.category_id;
            
            let requestData = {
                message: text,
                dir: 'BUY',
                prefix: '/TradeLeads/buy'
            };
            requestData[`ID__${profile_id}__${user_id}__${lead_id}__${category_id}__${lead_type}`] = 1;
              
            // Optional: If your API requires headers or cookies, you can include them in the config object
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'User-Agent': 'PostmanRuntime/7.36.3',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Referer': 'https://www.tradeindia.com/my-tradeindia/buy-leads/latest-buy-leads.html',// Adjust the content type based on your API requirements
                    'Cookie':buyleadCookie
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
            console.log("You already sent the reply for buylead");
            }
        
           
    });

};

module.exports = { buyleadlogic };
