# Cromwell Project  

## 📖 Description  
This is a Node.js application that enables users to register, log in, and view their profile details. It demonstrates secure user authentication, data management, and dynamic frontend rendering, designed as part of a technical assessment.  

I decided to be creative with this project so I created a dummy e-commerce platform, VBS Electronics, which allows customers to buy electronics.

---

## ✨ Features  
- **User Registration**: Create a new account with a valid email and password.  
- **User Login**: Secure login functionality using JWT for session management.  
- **Landing Page**: Wwelcomes the user into the platform.  
- **Home Page**: Gives the user a preview of the store and provides a navabr to navigate around the store.  
- **Product Catalogue**: The list of available products separated into categories. Allows the user to add a product to the cart.  
- **Item Cart**: The shopping cart which allows the user to view the items that have been added and for this to be edited.
---

## 💻 Tech Stack  
### Backend  
- **Node.js** and **Express.js**: REST API development.  
- **MongoDB**: Database management for user data.  

### Frontend  
- **React.js**: Dynamic and responsive user interface.  
- **Material-UI**: Pre-styled React components for professional UI.  

---

## 🚀 How to Run the Application  

### Prerequisites  
- **Node.js** (v14 or higher) installed.  
- **MongoDB** installed locally or access to a MongoDB Atlas cluster.  

### Setup Instructions  

1. **Clone the repository**:  
   ```bash  
   git clone <repository-url>  
   cd Cromwell-Project
   ```
2. **Install root dependencies**:
    ```bash  
    npm install 
    ```
3. **Install server dependencies**:
    ```bash  
    cd server  
    npm install 
    ```
4. **Install client dependencies**:
    ```bash  
    cd client  
    npm install 
    ```
5. **Run the application from the root directory (runs both the client and server concurrently)**:
    ```bash  
    npm run dev 
    ```
6. Ensure there is a .env file in the root of the server directory. For simplicity, this file has already been provided in the repository. The contents of the file should be:
    ```bash  
    MONGO_URL=mongodb+srv://basinavsanthosh:flF6sv1gxEc00QGi@cluster0.d3wew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    PORT = 5000
    SECRET_KEY=d27a44077637ac450de1697836f3175a5fbd29ce7e8426df1c5d93977ea6d3c5ac62e94610a3e0a613f31e22d2c955fa69c1e9265cd911cb0ea60b35aa41d0c7
    ```
---

## 🧪 Running Unit Tests

1. **Run client tests**:  
   ```bash  
   cd client
   npm test
   ```
2. **Run server tests**:
    ```bash  
    cd server
    npm test 
    ```















