import { TestBed } from '@angular/core/testing';
import { LocalStorageMock } from './local-storage.mock.service';

describe('LocalStorageMock', () => {
  let service: LocalStorageMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [LocalStorageMock],
    });

    service = TestBed.inject(LocalStorageMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('local storage mock service', () => {
    it('should return length of stored keys', () => {
      // Arrange
      service.clear();
      // Assert
      expect(service.length).toBe(3);
    });
  });

  it('should return value of stored key', () => {
    // Arrange
    service.clear();
    // Act

    // Assert
    expect(service.getItem('productEditState')).toBe('true');
  });

  it('should save a value in stored key', () => {
    // Arrange
    service.setItem('productEditState', 'false');

    // Assert
    expect(service.getItem('productEditState')).toBe('false');
  });

  it('should remove stored key', () => {
    // Arrange
    service.removeItem('productEditState');

    // Assert
    expect(service.getItem('productEditState')).toBe(null);
  });

  it('should return value with index of stored key', () => {
    // Arrange
    service.clear();

    // Assert
    expect(service.key(1)).toBe('productEditState');
  });

  it('should return null with index not corresponding to stored key', () => {
    // Arrange
    service.clear();

    // Assert
    expect(service.key(5)).toBe(null);
  });
});
