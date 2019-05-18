"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastJson = require("fast-json-stringify");
// const fastJson = require('fast-json-stringify')
const stringify = fastJson({
    title: 'Example Schema',
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            description: 'Age in years',
            type: 'integer'
        },
        reg: {
            type: 'string'
        }
    }
});
console.log(stringify({
    firstName: 'Matteo',
    lastName: 'Collina',
    age: 32,
    reg: /"([^"]|\\")*"/
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGZhc3Rqc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdGZhc3Rqc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQWdEO0FBQ2hELGtEQUFrRDtBQUNsRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDekIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsV0FBVyxFQUFFLGNBQWM7WUFDM0IsSUFBSSxFQUFFLFNBQVM7U0FDaEI7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ0Y7Q0FDRixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNwQixTQUFTLEVBQUUsUUFBUTtJQUNuQixRQUFRLEVBQUUsU0FBUztJQUNuQixHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxlQUFlO0NBQ3JCLENBQUMsQ0FBQyxDQUFDIn0=