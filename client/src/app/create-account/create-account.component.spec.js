"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const create_account_component_1 = require("./create-account.component");
describe('CreateAccountComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [create_account_component_1.CreateAccountComponent]
        });
        fixture = testing_1.TestBed.createComponent(create_account_component_1.CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
