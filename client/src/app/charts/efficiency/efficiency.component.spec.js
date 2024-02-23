"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const efficiency_component_1 = require("./efficiency.component");
describe('EfficiencyComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [efficiency_component_1.EfficiencyComponent]
        });
        fixture = testing_1.TestBed.createComponent(efficiency_component_1.EfficiencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
