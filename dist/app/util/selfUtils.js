"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelfUtils {
    static assign(json1, json2) {
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
        return json;
    }
}
exports.SelfUtils = SelfUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZlV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3V0aWwvc2VsZlV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxTQUFTO0lBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBSSxLQUE2QixFQUFFLEtBQTZCO1FBQ2hGLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7U0FDSjtRQUNELEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBQ0QsT0FBTyxJQUFTLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBZkQsOEJBZUMifQ==