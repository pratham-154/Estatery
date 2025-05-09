### 2025-03-10: Task 39 - Connecting Static Pages to Mock APIs

* **Why Mock APIs?**

    * Allows testing API-based content rendering before connecting to the real backend.

    * Helps simulate real user interactions (e.g., fetching properties dynamically).

* **Implementation:**

    * Used json-server to create a mock API locally.

    * Created fake API endpoints (/api/properties, /api/users).

    * Connected frontend pages to fetch mock data using Axios.

* **Testing:**

    * Checked if data loads dynamically when navigating between pages.

    * Verified that filtering and sorting work correctly with mock data.

