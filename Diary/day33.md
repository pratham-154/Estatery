### 2025-02-03: Task 33 - Developing Filter and Sort Functionality

* **Filter Implementation:**

    * Create a filter sidebar with options like:

        * Property Type (Apartment, Villa, Commercial)

        * Price Range (Slider to adjust min/max price)

        * Location (Dropdown or search-based filtering)

    * Use Redux to store selected filters and update the property list dynamically.

* **Sort Implementation:**

    * Add sorting options:

        * Price (Low to High, High to Low)

        * Date Added (Newest to Oldest, Oldest to Newest)

    * Use sort() function in JavaScript to rearrange property listings based on selected criteria.

* **Integrating with API Calls:**

    * Modify API requests to send selected filter parameters and fetch filtered data.

* **Testing & Debugging:**

    * Ensure filtering updates without requiring a page reload.

    * Test combination filters (e.g., Apartments under $1000 in New York).
