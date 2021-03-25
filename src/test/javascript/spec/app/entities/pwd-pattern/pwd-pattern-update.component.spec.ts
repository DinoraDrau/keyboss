import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeybossTestModule } from '../../../test.module';
import { PwdPatternUpdateComponent } from 'app/entities/pwd-pattern/pwd-pattern-update.component';
import { PwdPatternService } from 'app/entities/pwd-pattern/pwd-pattern.service';
import { PwdPattern } from 'app/shared/model/pwd-pattern.model';

describe('Component Tests', () => {
  describe('PwdPattern Management Update Component', () => {
    let comp: PwdPatternUpdateComponent;
    let fixture: ComponentFixture<PwdPatternUpdateComponent>;
    let service: PwdPatternService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [PwdPatternUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PwdPatternUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PwdPatternUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PwdPatternService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PwdPattern('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PwdPattern();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
