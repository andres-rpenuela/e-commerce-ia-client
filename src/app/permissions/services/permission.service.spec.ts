import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { PermissionService } from './permission.service';
import { Permission } from '../models/permission.model';

describe('PermissionService', () => {
  const API_URL = '/api/v1/permissions';
    //dependencies
    let httpTestingController: HttpTestingController;

    //service under test
    let service: PermissionService;

    // configuration for the test module
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PermissionService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(PermissionService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      // Verify that there are no outstanding HTTP requests after each test
      httpTestingController.verify();
    });

    // Test if the service is created successfully
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Test if the service can fetch a permission by ID
    it('should fetch permission by ID', () => {
        const mockPermission = {
          id: 1,
          code: 'PERSON_READ',
          permissionAction: 'READ',
          parentId: null
        };

        service.findPermissionById(1);

        const req = httpTestingController.expectOne(`${API_URL}/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPermission);
        expect(service.permission()).toEqual(mockPermission);
    });

    // Test simulation an error when fetching a permission by ID
    it('should handle error when fetching permission by ID', () => {
        service.findPermissionById(1);

        const req = httpTestingController.expectOne(`${API_URL}/1`);
        expect(req.request.method).toBe('GET');
        req.flush('Error fetching permission', {
          status: 500,
          statusText: 'Server Error'
        });
    });
})
