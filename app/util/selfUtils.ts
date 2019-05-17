export class SelfUtils {
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
}
