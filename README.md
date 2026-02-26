# coe-api-backend


## Endpoints

| Endpoint                    | Method    | Description                                    |
| --------------------------- | --------- | ---------------------------------------------- |
| /                           | GET       | Retrieve all blog posts                        |
| /me                         | GET       | Retrieve all blog posts (requires login)       |                      
| /posts                      | POST      | Create new blog post (requires login)          |                
| /@:username/:postId         | GET       | Retrieve specific blog post                    | 
| /posts/:postId              | GET       | Retrieve blog post (requires login)            |              
| /posts/:postId              | PUT/PATCH | Update blog post (requires login)              |
| /posts/:postId              | DELETE    | Delete blog post (requires login)              |
| /comments                   | POST      | Create comment (requires login)                |         
| /comments/:commentId        | PUT       | Update comment (requires login)                |
| /comments/:commentId        | DELETE    | Delete comment (requires login)                |
| /login                      | POST      | Login                                          |
| /signup                     | POST      | Create account                                 |

