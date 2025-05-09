### 2025-02-15: Task 20 - Setting Up Redux in the Project

* **Installing Redux Dependencies:**

    * Install Redux and Redux Toolkit:

* **Setting Up Redux Store (store.js):**

    * Create a Redux store and configure it with reducers.

* **Creating Slices (authSlice.js for Authentication):**

    * Define an initial state for authentication (e.g., isAuthenticated, user).

    * Create actions like loginSuccess, logout, and setUser.

* **Providing Redux Store to the App:**

    * Wrap the app with <Provider store={store}> in _app.js (Next.js) or index.js (React).

* **Testing Redux Setup:**

    * Dispatch test actions and verify state updates using Redux DevTools.