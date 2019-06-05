const axios = require("axios").default;

module.exports = {
	/**
	 * 获取近五天天气预报
	 */
	fetchFiveDaysWeather(city) {
		return axios({
			url: `http://api.k780.com/?app=weather.future&weaid=${city}&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`,
			method: "GET"
		}).then(res => {
			if (res && res.data && res.data.result) {
				let result = res.data.result;
				return result.map(item => {
					return {
						week: item.week,
						weather: item.weather,
						wind: item.wind,
						winp: item.winp,
						temp_high: item.temp_high,
						temp_low: item.temp_low
					};
				});
			}
		});
    },
    /**
     * 手机号码归属地
     * @param {string} cellphone 
     */
	fetchCellPhoneOrigin(cellphone) {
		return axios.get(
			`http://api.k780.com/?app=phone.get&phone=${cellphone}&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`
		).then(res=>{
            if(res && res.data && res.data.result) {
                return {
                    att:res.data.result.att,
                    operators:res.data.result.operators
                }
            }
            return null
        })
	}
};
