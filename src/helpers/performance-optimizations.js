// Performance optimization utilities

// Debounce function to reduce frequent calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function to limit execution frequency
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Batch DOM updates to reduce reflows
export const batchDOMUpdates = (updates) => {
  if (typeof window === "undefined") return;

  // Use requestAnimationFrame to batch updates
  requestAnimationFrame(() => {
    updates.forEach((update) => {
      try {
        update();
      } catch (error) {
        console.warn("[Performance] Error in batched DOM update:", error);
      }
    });
  });
};

// Defer non-critical operations
export const deferOperation = (operation, priority = "low") => {
  if (typeof window === "undefined") {
    operation();
    return;
  }

  if (priority === "high") {
    // High priority: use requestAnimationFrame
    requestAnimationFrame(operation);
  } else if (priority === "medium") {
    // Medium priority: use setTimeout with minimal delay
    setTimeout(operation, 16); // ~60fps
  } else {
    // Low priority: use requestIdleCallback with shorter timeout
    if ("requestIdleCallback" in window) {
      requestIdleCallback(operation, { timeout: 500 }); // Reduced from 1000ms
    } else {
      setTimeout(operation, 50); // Reduced from 100ms
    }
  }
};

// Optimize scroll events with better throttling
export const optimizeScrollHandler = (handler) => {
  let ticking = false;

  return function (...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        try {
          handler.apply(this, args);
        } catch (error) {
          // Suppress timeout errors during scroll
          if (error && typeof error === "string" && error.includes("Timeout")) {
            return;
          }
          console.warn("[Performance] Scroll handler error:", error);
        }
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Optimize resize events
export const optimizeResizeHandler = (handler) => {
  return debounce(handler, 100);
};

// Prevent layout thrashing by batching reads and writes
export const batchReadWrite = (readOperations, writeOperations) => {
  if (typeof window === "undefined") return;

  // First, read all values
  const readResults = readOperations.map((read) => read());

  // Then, use requestAnimationFrame to batch writes
  requestAnimationFrame(() => {
    writeOperations.forEach((write, index) => {
      try {
        write(readResults[index]);
      } catch (error) {
        console.warn("[Performance] Error in batched write operation:", error);
      }
    });
  });
};

// Monitor performance and log warnings
export const monitorPerformance = (operationName, operation) => {
  const startTime = performance.now();

  try {
    const result = operation();
    const duration = performance.now() - startTime;

    if (duration > 50) {
      console.warn(
        `[Performance] ${operationName} took ${duration.toFixed(2)}ms`
      );
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(
      `[Performance] ${operationName} failed after ${duration.toFixed(2)}ms:`,
      error
    );
    throw error;
  }
};

// Optimize image loading
export const optimizeImageLoading = () => {
  if (typeof window === "undefined") return;

  // Add loading="lazy" to images that don't have it
  const images = document.querySelectorAll("img:not([loading])");
  images.forEach((img) => {
    if (!img.loading) {
      img.loading = "lazy";
    }
  });

  // Add decoding="async" to images
  images.forEach((img) => {
    if (!img.decoding) {
      img.decoding = "async";
    }
  });
};

// Reduce reCAPTCHA performance impact
export const optimizeReCaptcha = () => {
  if (typeof window === "undefined") return;

  // Defer reCAPTCHA badge positioning
  const recaptchaBadge = document.querySelector(".grecaptcha-badge");
  if (recaptchaBadge) {
    recaptchaBadge.style.willChange = "width";
    recaptchaBadge.style.transform = "translateZ(0)"; // Force hardware acceleration
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === "undefined") return;

  // Optimize image loading
  if ("requestIdleCallback" in window) {
    requestIdleCallback(optimizeImageLoading, { timeout: 1000 });
  } else {
    setTimeout(optimizeImageLoading, 100);
  }

  // Optimize reCAPTCHA
  if ("requestIdleCallback" in window) {
    requestIdleCallback(optimizeReCaptcha, { timeout: 1000 });
  } else {
    setTimeout(optimizeReCaptcha, 100);
  }

  // Add passive event listeners globally
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === "touchstart" || type === "touchmove" || type === "wheel") {
      if (typeof options === "object") {
        options.passive = true;
      } else {
        options = { passive: true };
      }
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
};

export default {
  debounce,
  throttle,
  batchDOMUpdates,
  deferOperation,
  optimizeScrollHandler,
  optimizeResizeHandler,
  batchReadWrite,
  monitorPerformance,
  optimizeImageLoading,
  optimizeReCaptcha,
  initPerformanceOptimizations,
};
