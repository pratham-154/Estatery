### 2025-02-28: Task 31 - Implementing Modals for User Interactions

* **Purpose of Modals:**

    * Improve user interaction by providing popups for actions like login, property details, and confirmations.

    * Avoid page reloads by using modals instead of separate pages.

* **Implementation:**

    * Use React Portals to render modals outside the main DOM structure for better accessibility.

    * Implement a generic modal component that can be reused for different features.

* **Types of Modals Added:**

    * Login/Signup Modal (Allows users to authenticate without navigating away)

    * Property Details Quick View (Displays property details in a popup)

    * Delete Confirmation Modal (Asks for confirmation before deleting a property)

* **Styling & Accessibility Enhancements:**

    * Ensure keyboard accessibility (modal closes on Esc key).

    * Add a dark backdrop to improve visibility and focus on the modal content.

    * Implement smooth fade-in and slide-out animations for better user experience.

