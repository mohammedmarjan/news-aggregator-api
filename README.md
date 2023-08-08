# News Aggregator API

Welcome to the News Aggregator API project! This API provides a platform for users to register, log in, customize their news preferences, and fetch news articles based on those preferences.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/news-aggregator-api.git`
2. Install dependencies: `npm install`
3. Set up your configurations: Rename `config.example.js` to `config.js` and add your secret key and NewsAPI key.
4. Start the development server: `npm run dev`

## Endpoints

The API provides the following endpoints:

- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `GET /preferences`: Retrieve the news preferences for the logged-in user.
- `PUT /preferences`: Update the news preferences for the logged-in user.
- `GET /news`: Fetch news articles based on the logged-in user's preferences.

## Authentication

The API uses JWT-based authentication. When you log in, you'll receive a token that you need to include in the `Authorization` header for protected routes.

## External News API

The API fetches news articles from external sources using the NewsAPI. You'll need to sign up for a NewsAPI key and configure it in the `config.js` file.

## Contributing

Contributions to this project are welcome! If you find any issues or want to add features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

