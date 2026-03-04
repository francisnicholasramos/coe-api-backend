<h3 align="center">Crafts of Expression (API)</h3>

<p align="center">
    <b><a href="https://coe-api-jeh2.onrender.com">https://coe-api-jeh2.onrender.com</a></b>
</p>

<p align="center">
Built with TypeScript + Express backend for a blogging platform with authentication, post management, comments, image uploads, and production-minded security defaults.
</p>

## Endpoints

| Endpoint                    | Method    | Description                                    |
| --------------------------- | --------- | ---------------------------------------------- |
| /                           | GET       | Retrieve all blog posts                        |
| /me                         | GET       | Retrieve all blog posts (requires login)       |                      
| /search                     | GET       | Search specific blog post (requires login)     |                      
| /me/search                  | GET       | Search specific blog post                      |                      
| /posts                      | POST      | Create new blog post (requires login)          |                
| /@:username/:postId         | GET       | Retrieve specific blog post                    | 
| /posts/:postId              | GET       | Retrieve blog post (requires login)            |              
| /posts/:postId              | PUT/PATCH | Update blog post (requires login)              |
| /posts/:postId              | DELETE    | Delete blog post (requires login)              |
| /comments                   | POST      | Create comment (requires login)                |         
| /comments/:commentId        | PUT       | Update comment (requires login)                |
| /comments/:commentId        | DELETE    | Delete comment (requires login)                |
| /uploadImage                | POST      | Upload image in cloudinary (requires login)    |
| /uploadImage                | DELETE    | Delete image in cloudinary (requires login)    |
| /login                      | POST      | Login                                          |
| /signup                     | POST      | Create account                                 |

### Key Features
* **Blog Post Management**: Full CRUD operations - create, read, update, and delete posts
* **Commenting System**: Add comments to posts with PUBLIC and PRIVATE comment types
* **Publishing System**: Draft and published post states
* **Image Upload**: Support upload and manage images via Cloudinary as bucket storage
* **Search & Sorting**: Search and sort blog posts by title and content

### Additional Features
* **Authentication**: Access + Refresh token cookie strategy using JWT
* **Security**: Protected against common vulnerabilities with Helmet.
* **Modular Architecture**: Application structured by feature and split into layers for modularity and maintainability.
* **Type Safety**: All backend code written in Typescript.
* **Schema Validation**: Validates schema using Zod library 
* **Cloud Storage Integration**: Securely manage image uploads with Cloudinary Storage.
