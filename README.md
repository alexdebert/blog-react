### Quick start

#### 1. Run `npm install`

This will install all dependencies (listed in `package.json`) necessary to get you up and running.  Feel free to add additional npm packages as you progress.

#### 2. Run `npm start`

This will run two scripts concurrently:
1. `npm run api` will start [json-server](https://github.com/typicode/json-server) to provide a stubbed out REST API through `localhost:9001`.
2. `npm run serve` will start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to serve up your application.  You should see your default browser open up a window pointing to `localhost:9000`.

#### 3. Navigate to `http://localhost:9000/`

### Testing

To run tests:
```shell
$ npm test
```

## Using the REST API

> Note: Ensure that you've started the API server with `npm start` or `npm run api`.

A REST API is provided with seed data for blog posts and comments.  The REST API returns and accepts JSON.  Changes made to the "database" will persist as long as the API is running on `localhost:9001`.

**Base path:** http://localhost:9001

**GET** `/posts` *List all blog posts*<br>
**GET** `/posts/{id}` *View single blog post*<br>
**GET** `/posts/{id}/comments` *List all comments for single blog post*<br>
**POST** `/posts/{id}/comments` *Add comment to single blog post*<br>
**PUT** `/comments/{id}` *Update single comment*<br>

```javascript
interface Post {
  "id": Number;
  "title": String;
  "author": String;
  "publish_date": String; // Date that post was published in YYYY-MM-DD format
  "slug": String;         // Readable URL to use for individual posts
  "description": String;  // Short description for blog post listing
  "content": String;      // Full blog post content -- may contain markup
}

```

```javascript
interface Comment {
  "id": Number;
  "postId": Number;
  "parent_id": Number|null; // Parent comment for replies, is `null` if top-level comment
  "user": String;           // Name of commenter
  "date": String;           // Date of comment in YYYY-MM-DD format
  "content": String;        // Comment content
}
```
