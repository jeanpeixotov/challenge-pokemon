"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceError extends Error {
    constructor(type, data = {}) {
        super(type);
        this.data = null;
        this.data = data;
    }
}
exports.ServiceError = ServiceError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9lcnJvcnMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUEwQixTQUFRLEtBQUs7SUFHckMsWUFBWSxJQUFZLEVBQUUsT0FBWSxFQUFFO1FBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUhQLFNBQUksR0FBUSxJQUFJLENBQUM7UUFJdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBUEQsb0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2VydmljZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgZGF0YTogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxufVxuIl19