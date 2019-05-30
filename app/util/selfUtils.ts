export class SelfUtils {

    /**
     * json拼接
     * @param json1 json1
     * @param json2 json2
     */
    public static assign<T>(json1: { [key: string]: any }, json2: { [key: string]: any }): T {
        const json = {};
        for (const key in json1) {
            if (json1.hasOwnProperty(key)) {
                json[key] = json1[key];
            }
        }
        for (const key in json2) {
            if (json2.hasOwnProperty(key)) {
                json[key] = json2[key];
            }
        }
        return json as T;
    }

    /**
     * 省份校验
     * @param val 身份证号码的前两位
     */
    public static checkProv(val: string) {
        let pattern = /^[1-9][0-9]/;
        let provs = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门' };
        if (pattern.test(val)) {
            if (provs[val]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 出生日期校验
     * @param val 身份证号码的7-14位
     */
    public static checkDate(val: string) {
        let pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
        if (pattern.test(val)) {
            let year = val.substring(0, 4);
            let month = val.substring(4, 6);
            let date = val.substring(6, 8);
            let date2 = new Date(year + '-' + month + '-' + date);
            if (date2 && date2.getMonth() == (parseInt(month, 0) - 1)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 身份证号码校验码校验
     * @param val 身份证号码
     */
    public static checkCode(val: string) {
        const num11 = 11;
        const num17 = 17;
        let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let code = val.substring(num17);
        if (p.test(val)) {
            let sum = 0;
            for (let i = 0; i < num17; i++) {
                sum += parseInt(val.substr(i, 1), 0) * factor[i];
                console.log(sum);
            }
            if (parity[sum % num11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 身份证号码校验
     * @param val 身份证号码
     */
    public static checkID(val: string) {
        const num14 = 14;
        if (SelfUtils.checkCode(val)) {
            let date = val.substring(6, num14);
            if (SelfUtils.checkDate(date)) {
                if (SelfUtils.checkProv(val.substring(0, 2))) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 身份证姓名校验
     * @param val 身份证姓名
     */
    public static checkName(val: string) {
        let patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
        if (!patrn.exec(val)) {
            return false;
        }
        return true;
    }
}
