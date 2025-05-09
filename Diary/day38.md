### 2025-03-08: Task 38 - Cross-Browser Testing

* **Purpose:**

    * Ensure the website works consistently across different web browsers.

    * Identify and fix layout issues, JavaScript errors, or CSS inconsistencies that vary by browser.

* **Browsers Tested:**

    * Google Chrome (Most used browser, baseline for UI testing)

    * Mozilla Firefox (Checks JavaScript compatibility and rendering differences)

    * Safari (Checks macOS/iOS behavior, CSS flex/grid rendering)

    * Microsoft Edge (Ensures compatibility for Windows users)

    * Opera & Brave (Additional testing for users with privacy-focused browsers)

* **Common Issues Fixed:**

    * Flexbox inconsistencies in Safari → Used -webkit- prefixes to resolve.

    * Button hover effects not working in Firefox → Adjusted CSS for better compatibility.

    * Scroll behavior inconsistent in Edge → Tweaked overflow properties for smoother scrolling.

    * Performance optimizations (removed unnecessary animations for older browsers).

* **Tools Used for Testing:**

    * BrowserStack (Cross-browser testing platform).

    * Lighthouse (Chrome DevTools) for performance and accessibility analysis.


