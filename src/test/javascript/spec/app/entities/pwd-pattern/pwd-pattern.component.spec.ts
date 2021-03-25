import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KeybossTestModule } from '../../../test.module';
import { PwdPatternComponent } from 'app/entities/pwd-pattern/pwd-pattern.component';
import { PwdPatternService } from 'app/entities/pwd-pattern/pwd-pattern.service';
import { PwdPattern } from 'app/shared/model/pwd-pattern.model';

describe('Component Tests', () => {
  describe('PwdPattern Management Component', () => {
    let comp: PwdPatternComponent;
    let fixture: ComponentFixture<PwdPatternComponent>;
    let service: PwdPatternService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [PwdPatternComponent],
      })
        .overrideTemplate(PwdPatternComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PwdPatternComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PwdPatternService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PwdPattern('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pwdPatterns && comp.pwdPatterns[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
