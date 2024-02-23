"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsComponent = void 0;
const core_1 = require("@angular/core");
let TripsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-trips',
            templateUrl: './trips.component.html',
            styleUrls: ['./trips.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _closeButton_decorators;
    let _closeButton_initializers = [];
    let _modal_decorators;
    let _modal_initializers = [];
    var TripsComponent = _classThis = class {
        constructor() {
            this.isAvailable = (__runInitializers(this, _instanceExtraInitializers), true);
            this.displayString = "";
            this.isLoading = true;
            this.todaysDate = new Date();
            this.endDate = new Date();
            this.tripModel = {
                id: 0,
                startLocation: "",
                endLocation: "",
                startDate: new Date(),
                endDate: this.endDate,
                miles: 0,
            };
            this.trips = [];
            this.error = "";
            this.closeButton = __runInitializers(this, _closeButton_initializers, void 0);
            this.modal = __runInitializers(this, _modal_initializers, void 0);
            this.endDate.setDate(this.todaysDate.getDate() + 1);
            this.populateTrips();
        }
        populateTrips() {
            return __awaiter(this, void 0, void 0, function* () {
                var response = yield fetch('/api/trip/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + this.getCookie('token'),
                        'Content-Type': 'application/json'
                    }
                });
                var data = yield response.json();
                console.log(data);
                this.trips = data.trips.map((t) => ({ id: t.id, startDate: new Date(t['start_date']), endDate: new Date(t['end_date']), startLocation: t['start_location'], endLocation: t['end_location'], miles: t.miles })).sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
                this.isLoading = false;
            });
        }
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        onSubmit(event) {
            event.preventDefault();
            if (this.tripModel.id == 0)
                this.onAddTrip(event);
            if (this.tripModel.id > 0)
                this.onEditTrip(event);
        }
        onAddTripBtnClick(event) {
            this.resetModal();
        }
        ngAfterViewInit() {
            this.modal.nativeElement.addEventListener('shown.bs.modal', () => {
                this.modal.nativeElement.querySelector('.modal #startLocation').focus();
            });
            this.modal.nativeElement.addEventListener('hidden.bs.modal', () => {
                this.resetModal();
            });
        }
        resetModal() {
            this.tripModel = {
                id: 0,
                startLocation: "",
                endLocation: "",
                startDate: new Date(),
                endDate: this.endDate,
                miles: 0
            };
            this.error = "";
        }
        onAddTrip(event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                let response = yield fetch('/api/trip/create', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.getCookie('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.tripModel)
                });
                let data = yield response.json();
                if (!data.success)
                    return this.error = data.error;
                if (data.success) {
                    this.populateTrips();
                    this.closeButton.nativeElement.click();
                }
            });
        }
        onEditBtnClick(event, trip) {
            this.tripModel = trip;
        }
        onEditTrip(event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                let response = yield fetch('/api/trip/update', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + this.getCookie('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.tripModel)
                });
                let data = yield response.json();
                if (!data.success)
                    return this.error = data.error;
                this.populateTrips();
                this.closeButton.nativeElement.click();
            });
        }
        onDelete(event, tripId) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                var response = yield fetch('/api/trip/delete/' + tripId, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + this.getCookie('token'),
                        'Content-Type': 'application/json'
                    }
                });
                var data = yield response.json();
                if (!data.success)
                    return this.error = data.error;
                this.populateTrips();
            });
        }
    };
    __setFunctionName(_classThis, "TripsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _closeButton_decorators = [(0, core_1.ViewChild)('closeButton')];
        _modal_decorators = [(0, core_1.ViewChild)('modal')];
        __esDecorate(null, null, _closeButton_decorators, { kind: "field", name: "closeButton", static: false, private: false, access: { has: obj => "closeButton" in obj, get: obj => obj.closeButton, set: (obj, value) => { obj.closeButton = value; } }, metadata: _metadata }, _closeButton_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modal_decorators, { kind: "field", name: "modal", static: false, private: false, access: { has: obj => "modal" in obj, get: obj => obj.modal, set: (obj, value) => { obj.modal = value; } }, metadata: _metadata }, _modal_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TripsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TripsComponent = _classThis;
})();
exports.TripsComponent = TripsComponent;
