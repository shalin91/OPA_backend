const crypto =  require('crypto');
const axios = require('axios');
// import axios from "axios";


// const {salt_key, merchant_id} = require('./secret')

const newPayment = async (req, res) => {
    const merchant_id = "PGTESTPAYUAT";
    const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const url = `${process.env.BACKEND_URL}`;

    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `${url}/api/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios(options);

        if (response.data.success === true) {
            const url = response.data.data.instrumentResponse.redirectInfo.url;
            console.log("Response of payment:", response.data);
            console.log("Data:", response.data.data.instrumentResponse);
            res.status(200).json({ url: url });
        } else {
            console.error("Payment request failed:", response.data);
            res.status(500).json({
                message: "Payment request failed",
                success: false
            });
        }
    } catch (error) {
        console.error("Error in newPayment:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const checkStatus = async(req, res) => {
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            // const url = `http://localhost:3000/success`
            // return res.redirect(url)
        } else {
            // const url = `http://localhost:3000/failure`
            // return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

module.exports = {
    newPayment,
    checkStatus
}