Online Store - Summary

Storedev is a fully functional e-commerce website built with Spring and React. It provides users with an engaging shopping experience, allowing them to browse a wide range of products, add items to their shopping cart, and complete purchases securely.
Features:

    Responsive design for optimal user experience on different devices.
    Secure payment processing for safe transactions.
    User-friendly interface for easy navigation and product discovery.
    Real-time updates of cart items and prices.
    Interactive checkout process with shipping and payment options.

How to Download and Use in Development Mode
Prerequisites:

    Node.js and npm for React development.
    Java and Maven for Spring development.

Steps:

    Download the Code:
        Clone the repository of your online store from the provided GitHub link.

    Set Up Backend (Spring):
        Navigate to the backend directory of the project.
        Configure the database connection in the application.properties file.
        Build the Spring project using Maven: mvn clean install.
        Run the Spring application: java -jar target/your-backend.jar.

    Set Up Frontend (React):
        Navigate to the frontend directory of the project.
        Install required dependencies: npm install.
        Start the React development server: npm run dev.
        The React app will run on http://localhost:5173.

    Accessing the Store:
        Open your web browser and go to http://localhost:5173.
        Explore the website, view products, and add items to the shopping cart.
        Proceed to the checkout page to enter shipping and payment details.
    API Documentation (Swagger):

        Access the API documentation through Swagger UI at http://localhost:8080/swagger-ui/index.html.
        Swagger provides detailed documentation of the API endpoints, request parameters, and response structures.
        Use Swagger to understand the available endpoints and interact with the API during development.

    Testing in Development Mode:
        In development mode, test various features and functionalities of the store.
        Ensure interactions with the backend, like adding items to the cart and placing orders, work as expected.

    Note: In development mode, the website may lack production-ready optimizations and security measures. Conduct further testing and implement additional security measures before deploying the online store to a live environment.

For more detailed instructions or specific project details, refer to the project's documentation and README.

Enjoy developing and exploring your e-commerce website! 🛍️
