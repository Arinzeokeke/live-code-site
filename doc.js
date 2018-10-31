/**
 * @api {post} /users Register for an account
 * @apiGroup User
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} username User username
 *
 * @apiParamExample {json} Input
 *    {
 *      "email": "john@doe.com",
 *      "password": "p@ssword",
 *      "username": "John"
 *    }
 *
 * @apiSuccess {String} email User email
 * @apiSuccess {String} username User username
 * @apiSuccess {String} token User token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "email": "john@doe.com",
 *      "username": "John",
 *      "token": "fmkmfimvmf3rmi3ri3vnc"
 *    }
 * @apiErrorExample {json} Insufficient parameters
 *    HTTP/1.1 422 Unprocessible Entity
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 500 Internal Bad Request
 */

/**
 * @api {get} /users Get all Users
 * * @apiGroup User
 * @apiSuccess {String} email User email
 * @apiSuccess {String} username User username
 * @apiSuccess {String} token User token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "users": [{
 *      "email": "john@doe.com",
 *      "username": "John",
 *      "token": "fmkmfimvmf3rmi3ri3vnc"
 *    }],
 *      "count": 1
 *    }
 *
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 400 Bad Request
 */

/**
 * @api {post} /users/login Login to account
 * @apiGroup User
 * @apiParam {String} password User password
 * @apiParam {String} username User username
 *
 * @apiParamExample {json} Input
 *    {
 *      "password": "p@ssword",
 *      "username": "John"
 *    }
 *
 * @apiSuccess {String} email User email
 * @apiSuccess {String} username User username
 * @apiSuccess {String} token User token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "email": "john@doe.com",
 *      "username": "John",
 *      "token": "fmkmfimvmf3rmi3ri3vnc"
 *    }
 * @apiErrorExample {json} Insufficient parameters
 *    HTTP/1.1 422 Unprocessible Entity
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 500 Internal Bad Request
 */

/**
 * @api {get} /users/current Get current Logged In User
 * * @apiGroup User
 * @apiSuccess {String} email User email
 * @apiSuccess {String} username User username
 * @apiSuccess {String} token User token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "email": "john@doe.com",
 *      "username": "John",
 *      "token": "fmkmfimvmf3rmi3ri3vnc"
 *    }
 *
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 400 Bad Request
 *  @apiErrorExample {json} Bad request
 *    HTTP/1.1 403 Forbidden
 */

/**
 * @api {get} /users/:id Get Specific User
 * * @apiGroup User
 * @apiSuccess {String} email User email
 * @apiSuccess {String} username User username
 * @apiSuccess {String} token User token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "email": "john@doe.com",
 *      "username": "John",
 *      "token": "fmkmfimvmf3rmi3ri3vnc"
 *    }
 *
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 400 Bad Request
 *  @apiErrorExample {json} Bad request
 *    HTTP/1.1 403 Forbidden
 */

/**
 * @api {get} /users/:id/channels Get Specific User's channels
 * * @apiGroup Channel
 * @apiSuccess {String} title Channel Title
 * @apiSuccess {User} owner channel owner
 * @apiSuccess {String} post CHannel Post
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {channels: [{
 *      "title": "john@doe.com",
 *      "owner": "John",
 *      "post": "ggdygwh22"
 *    }],
 *      "count": 1
 *     }
 *
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 400 Bad Request
 *  @apiErrorExample {json} Bad request
 *    HTTP/1.1 403 Forbidden
 */

//////// CHANNELS ////////

/**
 * @api {get} /channels Get all Channels
 * * @apiGroup Channel
 * @apiSuccess {String} title Channel Title
 * @apiSuccess {User} owner channel owner
 * @apiSuccess {String} post CHannel Post
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "channels": [{
 *      "title": "john@doe.com",
 *      "owner": "John",
 *      "post": "ggdygwh22",
 *      "participants": ["john", "james", "philip"],
 *      "writers": ["john","philip"],
 *    }],
 *      "count": 1
 *    }
 *
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 400 Bad Request
 */

/**
 * @api {post} /channels Create Channel
 * @apiGroup Channel
 * @apiParam {String} title Channel Title
 * @apiParam {String} extension Channel FIle Extension . eg: 'javascript'
 * @apiParam {Boolean} online Channel online status
 *
 * @apiParamExample {json} Input
 *    {
 *      "title": "Jide's Tutorial",
 *      "extension": "javascript",
 *      "online": true
 *    }
 *
 * @apiSuccess {String} title Channel Title
 * @apiSuccess {String} extension Channel FIle Extension . eg: 'javascript'
 * @apiSuccess {Boolean} online Channel online status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "title": "Jide's Tutorial",
 *      "extension": "javascript",
 *      "online": true
 *    }
 * @apiErrorExample {json} Insufficient parameters
 *    HTTP/1.1 422 Unprocessible Entity
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Bad request
 *    HTTP/1.1 500 Internal Bad Request
 */
