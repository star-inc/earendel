# Earendel

Simple cache server for DevOps.

The server provides a simple API for caching data like text or binary files.

## Installation

Install the dependencies.

```shell
npm install
```

## Development

Hot-reload to help you create your application in fast,
reducing the time while debugging.

```shell
npm run dev
```

## Production

Start the service for providing to our dear clients!

```shell
npm start
```

## API

The API documentation of earendel.

### GET /token

Generate a new token. The token is a [nanoid](https://www.npmjs.com/package/nanoid).

Every token is unique, and it is used to identify the content in the cache.

### GET /text/:token

Get the text content from the cache.

### POST /text/:token

Save the text content to the cache.

### DELETE /text/:token

Delete the text content from the cache.

### GET /file/:token

Get the file content from the cache.

### POST /file/:token

Save the file content to the cache.

### DELETE /file/:token

Delete the file content from the cache.
