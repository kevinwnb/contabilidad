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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavComponent = void 0;
const core_1 = require("@angular/core");
let NavComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _isLoading_decorators;
    let _isLoading_initializers = [];
    let _isLoadingChange_decorators;
    let _isLoadingChange_initializers = [];
    var NavComponent = _classThis = class {
        constructor(router) {
            this.router = (__runInitializers(this, _instanceExtraInitializers), router);
            this.isLoading = __runInitializers(this, _isLoading_initializers, false);
            this.isLoadingChange = __runInitializers(this, _isLoadingChange_initializers, new core_1.EventEmitter());
        }
        onLogout(e) {
            this.isLoadingChange.emit(true);
            setTimeout(() => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                this.isLoadingChange.emit(false);
                this.router.navigate(['/login']);
            }, 3000);
        }
    };
    __setFunctionName(_classThis, "NavComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isLoading_decorators = [(0, core_1.Input)()];
        _isLoadingChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _isLoading_decorators, { kind: "field", name: "isLoading", static: false, private: false, access: { has: obj => "isLoading" in obj, get: obj => obj.isLoading, set: (obj, value) => { obj.isLoading = value; } }, metadata: _metadata }, _isLoading_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isLoadingChange_decorators, { kind: "field", name: "isLoadingChange", static: false, private: false, access: { has: obj => "isLoadingChange" in obj, get: obj => obj.isLoadingChange, set: (obj, value) => { obj.isLoadingChange = value; } }, metadata: _metadata }, _isLoadingChange_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavComponent = _classThis;
})();
exports.NavComponent = NavComponent;
