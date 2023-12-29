# Mini Academy API

This repository contains the Mini Academy API source code, acting as a bridge between the platform's back-end functionalities and front-end user interfaces. It enables the integration of key features like course management, mentor details, user information, assessments, payment systems, and authentication into various user-facing applications.

## Usage
### Database Scheme
Make sure to adjust the database configuration according to the following schema:

![ERD Mini Academy](https://github.com/vanderoo/mini-academy-api/blob/master/ERD_Mini%20Academy.png)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vanderoo/mini-academy-api.git
   ```

2. **Install Node Modules:**
   ```bash
   npm install
   ```

3. **Create .env File:**
   Duplicate the `.env.example` file and name it `.env`. Fill in the configuration values according to your requirements.
   ```env
    HOST=127.0.0.1
    PORT=3333
    NODE_ENV=development
    
    APP_NAME=AdonisJs
    APP_URL=http://${HOST}:${PORT}
    
    CACHE_VIEWS=false
    
    APP_KEY=
    
    DB_CONNECTION=sqlite
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    DB_DATABASE=adonis
    
    HASH_DRIVER=bcrypt
   ```
    

4. **Run the Application:**
   ```bash
   npm run start
   ```

   The application can now be accessed at `http://localhost:3333`.
