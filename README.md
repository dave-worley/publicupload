# David - April 21, 2019
## Installation
1. Clone the repository. The one repository contains both the API server and the UI code.
2. Start the API server. From the repository root: `cd apiserver && yarn start`. This will start nodemon and serve the basic API from port 8000.
3. Start the UI development server. From the repository root: `cd ui && yarn start`. This will start the UI server on port 3000.

## Security
// List security concerns:
// - that have been addressed
// - that have *not* been addressed

## Improvements
- A real database. To save time I used the filesystem to store metadata about images. This should have been stored in a relational database or a document store. This is my first Express based app and I didn't want to incur the overhead of adding Mongo, sqlite, or MySQL. In retrospect it would have been basically the same level of effort.
// What could be added to the app / API?

## Libraries
// What external libraries have you used and why?

## API
// Any general observation about the API?
// document each endpoint using the following template:
```
### GET /listuploads
List all uploads.
returns: an array of objects matching the shape:
{
  id: String,
  size: Number,
  name: String
}
```
```
### GET /listuploads/:name
List all uploads filtered by the original filename.
params:
- name: A string value to search original filenames with. Case sensitive.
returns:
- an array of objects matching the shape:
`{
  id: String,
  size: Number,
  name: String
}`
```
```
### POST /upload
Upload a file of type png or jpg.
params: data
returns: an array of objects matching the shape:
{
  id: String,
  size: Number,
  name: String
}
```
---
## Other notes
// Anything else you want to mention