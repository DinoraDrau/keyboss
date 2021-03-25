import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeybossTestModule } from '../../../test.module';
import { ResourcePwdUpdateComponent } from 'app/entities/resource-pwd/resource-pwd-update.component';
import { ResourcePwdService } from 'app/entities/resource-pwd/resource-pwd.service';
import { ResourcePwd } from 'app/shared/model/resource-pwd.model';

describe('Component Tests', () => {
  describe('ResourcePwd Management Update Component', () => {
    let comp: ResourcePwdUpdateComponent;
    let fixture: ComponentFixture<ResourcePwdUpdateComponent>;
    let service: ResourcePwdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [ResourcePwdUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ResourcePwdUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResourcePwdUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResourcePwdService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ResourcePwd('123');
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
        const entity = new ResourcePwd();
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
