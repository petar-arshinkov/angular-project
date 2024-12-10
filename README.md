Stock Management Application
This project is a web application for managing stocks. Users can log in, register, logout, create, delete and update stocks, view stock details, add stocks to their watchlist, and remove them. 

Technologies Used
Frontend
Angular: Component-based framework for building the user interface.
HTML5 & CSS3: Structure and styling.
TypeScript: Strongly typed JavaScript for enhanced developer experience.

Frontend runs on http://localhost:4200

Backend
Node.js: Server runtime.
Express.js: Framework for building RESTful APIs.
MongoDB: Database for storing stocks and user data.
Mongoose: ODM for MongoDB.

Backend is provided in the REST-API Folder and runs on http://localhost:3000
To run it please use the following

npm i
npm start

User Guide
Register: Create your user profile
Login: Authenticate with your credentials.
Browse Stocks: View available stocks in the main interface.
View Stock Details by clicking the view details button on your selected stock on the home page
Add A Stock: Create a new stock and add it to the stock list on the home page
Edit or Delete the selected stock
Add to Watchlist: Click the "Add to Watchlist" button for any stock.
View Watchlist: Navigate to the watchlist page to manage your watched stocks.
Remove from Watchlist: Use the "Stop Watching" feature to remove a stock.


Sample DB data for stocks and users can be found here  - https://drive.google.com/drive/folders/1xmYKtJr_x8BJ3gGhdugmv0H8_KPmZZqf?usp=sharing
db url is dbURL: 'mongodb://localhost:27017/forum',