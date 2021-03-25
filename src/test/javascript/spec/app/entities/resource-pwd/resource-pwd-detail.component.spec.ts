import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeybossTestModule } from '../../../test.module';
import { ResourcePwdDetailComponent } from 'app/entities/resource-pwd/resource-pwd-detail.component';
import { ResourcePwd } from 'app/shared/model/resource-pwd.model';

describe('Component Tests', () => {
  describe('ResourcePwd Management Detail Component', () => {
    let comp: ResourcePwdDetailComponent;
    let fixture: ComponentFixture<ResourcePwdDetailComponent>;
    const route = ({ data: of({ resourcePwd: new ResourcePwd('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [ResourcePwdDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ResourcePwdDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResourcePwdDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load resourcePwd on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.resourcePwd).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
