// src/setupTests.js
import '@testing-library/jest-dom';

// Mock IntersectionObserver which isn't available in test environment
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    this.disconnect = jest.fn();
    this.observe = jest.fn((element) => {
      this.elements.add(element);
    });
    this.unobserve = jest.fn((element) => {
      this.elements.delete(element);
    });
    this.takeRecords = jest.fn(() => []);
  }
}

window.IntersectionObserver = IntersectionObserverMock;

// Mock ResizeObserver
class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}

window.ResizeObserver = ResizeObserverMock;