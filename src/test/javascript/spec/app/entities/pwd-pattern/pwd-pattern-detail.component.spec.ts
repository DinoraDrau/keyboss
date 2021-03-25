import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeybossTestModule } from '../../../test.module';
import { PwdPatternDetailComponent } from 'app/entities/pwd-pattern/pwd-pattern-detail.component';
import { PwdPattern } from 'app/shared/model/pwd-pattern.model';

describe('Component Tests', () => {
  describe('PwdPattern Management Detail Component', () => {
    let comp: PwdPatternDetailComponent;
    let fixture: ComponentFixture<PwdPatternDetailComponent>;
    const route = ({ data: of({ pwdPattern: new PwdPattern('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [PwdPatternDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PwdPatternDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PwdPatternDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pwdPattern on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pwdPattern).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
