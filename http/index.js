
module.exports = {
    /**
     * 获取近五天天气预报
     */
    fetchFiveDaysWeather(city) {
        if(!city) return Promise.reject('请输入城市名称');
        return axios({
            url:`http://api.k780.com/?app=weather.future&weaid=${city}&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`,
            method:'GET'
        }).then(res=>{
            if(res && res.data && res.data.result) {
                let result = res.data.result;
                return result.map(item=>{
                    return {
                        week:item.week,
                        weather:item.weather,
                        wind:item.wind,
                        winp:item.winp,
                        temp_high:item.temp_high,
                        temp_low:item.temp_low
                    }
                })
            }
        })
    }
}