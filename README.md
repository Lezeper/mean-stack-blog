# Blog - MEAN stack

### REST API
##### Public
        GET - /api/post                             - get all posts
        GET - /api/post/category                    - get all categories
        GET - /api/post/category/:cateogry          - get posts by category
        GET - /api/post/keyword/:keyword            - get posts by keyword
        GET - /api/post/tag                         - get all tags
        GET - /api/post/tag/:tag                    - get posts by tag
        GET - /api/post/id/:id                      - get post by id
##### Authority required
        GET - /api/log                  - get logs
        POST - /api/post/               - create new post
        PUT - /api/post/id/:id          - update post
        DELETE - /api/post/id/:id       - delete post
        DELETE - /api/log               - clear all logs
    
### Links
        /               - home page
        /login          - login page (for admin)
        /register       - register page (for admin test)
        /p/:id          - specific post page
        /p?tag=... ?category=... ?keyword=...   - find posts by filter
        /admin/post     - admin post panel
        /admin/post?eid={eid}   - edit post
        /api/log   [POST]  - create log
    
### Framework and Plugin
        Mongoose
        Express
        AngularJS
        NodeJS
        JWT
        TinyMCE
        
        
        
        
