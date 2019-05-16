export class GameUitl {
    /**
     * 获取7位的房间ID
     * @return number 
     */
    public static generateRoomId(): number {
        let roomId = '';
        for (let i = 0; i < 7; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId, 0);
    }

    /**
     * 获取本地时间
     * @returns string    xxxx.xx.xx xx:xx:xx
     */
    public static getLocalDateStr(): string {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateStr = year + '/' + month + '/' + day + '  ' + hours + ':' + minutes + ':' + seconds;
        return dateStr;
    }
}
