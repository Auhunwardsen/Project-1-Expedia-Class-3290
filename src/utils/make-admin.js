/**
 * To make a user admin:
 * 
 * 1. Go to db.json file
 * 2. Find the user in the "users" array
 * 3. Add "isAdmin": true to that user's object
 * 4. Save the file
 * 5. Restart the JSON server if it's running
 * 
 * We've already made user "hi" with phone number "+12223334444" an admin.
 * You can log in with this account to access the admin panel.
 * 
 * Example of what we did:
 * 
 * Before:
 * {
 *   "id": "0ccb",
 *   "number": "+12223334444",
 *   "user_name": "hi",
 *   "password": "123"
 * }
 * 
 * After:
 * {
 *   "id": "0ccb",
 *   "number": "+12223334444",
 *   "user_name": "hi",
 *   "password": "123",
 *   "isAdmin": true
 * }
 */