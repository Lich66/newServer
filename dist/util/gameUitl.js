"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameUitl {
    /**
     * 获取6位的房间ID
     * @return number
     */
    static generateRoomId() {
        let roomId = '';
        for (let i = 0; i < 6; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId, 0);
    }
    /**
     * 获取本地时间
     * @returns string    xxxx.xx.xx xx:xx:xx
     */
    static getLocalDateStr() {
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
exports.GameUitl = GameUitl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsUUFBUTtJQUNqQjs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYztRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxlQUFlO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDNUYsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBNUJELDRCQTRCQyJ9