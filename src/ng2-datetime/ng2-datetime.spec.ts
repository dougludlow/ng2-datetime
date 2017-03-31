import { Component, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NKDatetimeModule } from './ng2-datetime.module';
import { NKDatetime } from './ng2-datetime';

describe('ng2-datetime', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, NKDatetimeModule],
            declarations: [DatePickerComponent]
        });
    });

    it('should instantiate', () => {
        const component = TestBed.createComponent(NKDatetime).componentInstance;
        expect(component).not.toBeNull();
        expect(component instanceof NKDatetime).toEqual(true);
    });

    describe('datepicker', () => {
        it('should update ngModel when datepicker value changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(DatePickerComponent);
            const component = getComponent(fixture, NKDatetime);

            fixture.componentInstance.date = null;

            tickAndDetect(fixture, 2);

            component.datepicker.datepicker('setDate', new Date(2011, 2, 5));

            tickAndDetect(fixture);

            expect(fixture.componentInstance.date).toEqual(new Date(2011, 2, 5));
        }));

        it('should update ngModel/datepicker when the input changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(DatePickerComponent);
            const component = getComponent(fixture, NKDatetime);

            tickAndDetect(fixture, 2);

            let element = fixture.debugElement.query(By.css('.date input')).nativeElement;
            element.value = '03/05/2011';
            element.dispatchEvent(new Event('keyup'));

            tickAndDetect(fixture, 2);

            expect(fixture.componentInstance.date).toEqual(new Date(2011, 2, 5));
        }));
    });

    describe('timepicker', () => {
        it('should update ngModel when timepicker value changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(DatePickerComponent);
            const component = getComponent(fixture, NKDatetime);

            fixture.componentInstance.date = new Date(2011, 2, 5, 0, 0);

            tickAndDetect(fixture, 2);

            component.timepicker.timepicker('setTime', '12:45 AM');

            tickAndDetect(fixture);

            expect(fixture.componentInstance.date).toEqual(new Date(2011, 2, 5, 0, 45));
        }));
    });
});

function getComponent<T>(fixture: ComponentFixture<any>, type: Type<T>): T {
    // tick for each component in the component tree
    tickAndDetect(fixture, 2);
    return fixture.debugElement.query(By.directive(type)).componentInstance;
}

function tickAndDetect(fixture: ComponentFixture<any>, times: number = 1) {
    for (let i = 0; i < times; i++) {
        tick();
        fixture.detectChanges();
    }
}

@Component({
    template: `
        <datetime [(ngModel)]="date"></datetime>
    `
})
class DatePickerComponent {
    date: Date;
}
