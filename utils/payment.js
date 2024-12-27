const axios = require('axios')
module.exports = async (payload) => {
    const { email, name, phoneNumber } = payload
    const data = {
        email,
        name,
        phoneNumber,
        "bankcode": ["101", "120001"],
        "account_type": "STATIC",
        "businessid": process.env.PAYVASSEL_BUSSINESS_ID,
        "bvn": "",

    }
    const header = {
        'api-key': process.env.PAYVASSEL_API_KEY,
        'api-secret': `Bearer ${process.env.PAYVASSEL_SEC_KEY}`,
        'Content-Type': 'application/json'
    }
    try{
        const request = await axios.post(`${process.env.PAYVASSEL_URL}api/external/request/customerReservedAccount/`,
            data, { headers: header }
        )
        return request
    }catch(err){
        console.log(err)
        return ;
    }
}