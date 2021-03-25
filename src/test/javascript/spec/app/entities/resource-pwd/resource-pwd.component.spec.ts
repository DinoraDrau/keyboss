import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KeybossTestModule } from '../../../test.module';
import { ResourcePwdComponent } from 'app/entities/resource-pwd/resource-pwd.component';
import { ResourcePwdService } from 'app/entities/resource-pwd/resource-pwd.service';
import { ResourcePwd } from 'app/shared/model/resource-pwd.model';

describe('Component Tests', () => {
  describe('ResourcePwd Management Component', () => {
    let comp: ResourcePwdComponent;
    let fixture: ComponentFixture<ResourcePwdComponent>;
    let service: ResourcePwdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeybossTestModule],
        declarations: [ResourcePwdComponent],
      })
        .overrideTemplate(ResourcePwdComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResourcePwdComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResourcePwdService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ResourcePwd('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.resourcePwds && comp.resourcePwds[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
