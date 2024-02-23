"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const cost_per_mile_component_1 = require("./cost-per-mile.component");
describe('CostPerMileComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [cost_per_mile_component_1.CostPerMileComponent]
        });
        fixture = testing_1.TestBed.createComponent(cost_per_mile_component_1.CostPerMileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
