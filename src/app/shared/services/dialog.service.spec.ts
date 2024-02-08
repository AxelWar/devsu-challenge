import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { ViewContainerRef } from '@angular/core';

const mockViewContainerRef: Partial<ViewContainerRef> = {
  clear: jest.fn(),
};

describe('DialogService', () => {
  let service: DialogService;
  let testViewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    });

    service = TestBed.inject(DialogService);
    testViewContainerRef = mockViewContainerRef as ViewContainerRef;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('open should...', () => {
    // Arrange
    jest.spyOn(service, 'open').mockResolvedValue(true);
    jest.spyOn(service, 'close').mockClear();
    // Act
    service.open(testViewContainerRef);
    // Assert
    expect(service.open).toBeTruthy();
  });

  it('close should clear the view container', () => {
    // Act
    service.close(testViewContainerRef);
    // Assert
    expect(testViewContainerRef.clear).toHaveBeenCalled();
  });
});
