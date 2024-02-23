"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const refuel_component_1 = require("./refuel.component");
describe('RefuelComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [refuel_component_1.RefuelComponent]
        });
        fixture = testing_1.TestBed.createComponent(refuel_component_1.RefuelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
