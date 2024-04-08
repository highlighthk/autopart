const jsonData = require('./data.json');
require('dotenv').config();
const {today, fromdate} = require('./utils');

module.exports.inquiryApi = `${process.env.API_URL_INQUIRY}from_date=${today}&to_date=${today}&limit=10&page_no=`;
module.exports.buyleadsApi = `${process.env.API_URL_BUYLEADS}from_date=${today}&to_date=${today}&limit=50&page_no=`;
module.exports.buyleadsRespondedApi = `${process.env.API_URL_BUYLEADS}from_date=${today}&to_date=${today}&responded_buy_leads=1&limit=50&page_no=`

module.exports.port = process.env.PORT || 3000;
module.exports.smtpport = jsonData.smtpport;
module.exports.smtphost = jsonData.host;
module.exports.user = jsonData.emailuser;
module.exports.pass = jsonData.emailpass;
module.exports.inquiryReplyApi = process.env.API_URL_REPLY_INQUIRY;
module.exports.buyleadReplyApi = process.env.API_URL_REPLY_BUYLEAD;
module.exports.inquiryCookie = process.env.INQUIRYCOOKIE;
module.exports.buyleadCookie = process.env.BUYLEADCOOKIE;
module.exports.Inquirytext_1 = jsonData.inquiry_1;
module.exports.Inquirytext_2 = jsonData.inquiry_2;

module.exports.Buyleadtext_1 = jsonData.buylead_1;
module.exports.Buyleadtext_2 = jsonData.buylead_2;

//Date Setting

// module.exports.inquiryApi = `${process.env.API_URL_INQUIRY}from_date=${jsonData.fromdate}&to_date=${today}&limit=10&page_no=`;
// module.exports.buyleadsApi = `${process.env.API_URL_BUYLEADS}from_date=${jsonData.fromdate}&to_date=${today}&limit=50&page_no=`;
// module.exports.buyleadsRespondedApi = `${process.env.API_URL_BUYLEADS}from_date=${jsonData.fromdate}&to_date=${today}&responded_buy_leads=1&limit=50&page_no=`

 //module.exports.inquiryApi = `${process.env.API_URL_INQUIRY}from_date=2024-03-22&to_date=2024-03-22&limit=10&page_no=`;
 //module.exports.buyleadsApi = `${process.env.API_URL_BUYLEADS}from_date=2024-03-29&to_date=2024-03-31&limit=50&page_no=`;
 //module.exports.buyleadsRespondedApi = `${process.env.API_URL_BUYLEADS}from_date=2024-03-29&to_date=2024-03-31&responded_buy_leads=1&limit=50&page_no=`