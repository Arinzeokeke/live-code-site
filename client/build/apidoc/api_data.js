define({ "api": [
  {
    "type": "get",
    "url": "/channels",
    "title": "Get all Channels",
    "group": "Channel",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Channel Title</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "owner",
            "description": "<p>channel owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>CHannel Post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"channels\": [{\n  \"title\": \"john@doe.com\",\n  \"owner\": \"John\",\n  \"post\": \"ggdygwh22\",\n  \"participants\": [\"john\", \"james\", \"philip\"],\n  \"writers\": [\"john\",\"philip\"],\n}],\n  \"count\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "Channel",
    "name": "GetChannels"
  },
  {
    "type": "get",
    "url": "/users/:id/channels",
    "title": "Get Specific User's channels",
    "group": "Channel",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Channel Title</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "owner",
            "description": "<p>channel owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>CHannel Post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{channels: [{\n  \"title\": \"john@doe.com\",\n  \"owner\": \"John\",\n  \"post\": \"ggdygwh22\"\n}],\n  \"count\": 1\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 403 Forbidden",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "Channel",
    "name": "GetUsersIdChannels"
  },
  {
    "type": "post",
    "url": "/channels",
    "title": "Create Channel",
    "group": "Channel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Channel Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<p>Channel FIle Extension . eg: 'javascript'</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "online",
            "description": "<p>Channel online status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"title\": \"Jide's Tutorial\",\n  \"extension\": \"javascript\",\n  \"online\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Channel Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<p>Channel FIle Extension . eg: 'javascript'</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "online",
            "description": "<p>Channel online status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"title\": \"Jide's Tutorial\",\n  \"extension\": \"javascript\",\n  \"online\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Insufficient parameters",
          "content": "HTTP/1.1 422 Unprocessible Entity",
          "type": "json"
        },
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 500 Internal Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "Channel",
    "name": "PostChannels"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all Users",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"users\": [{\n  \"email\": \"john@doe.com\",\n  \"username\": \"John\",\n  \"token\": \"fmkmfimvmf3rmi3ri3vnc\"\n}],\n  \"count\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "User",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "/users/current",
    "title": "Get current Logged In User",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"email\": \"john@doe.com\",\n  \"username\": \"John\",\n  \"token\": \"fmkmfimvmf3rmi3ri3vnc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 403 Forbidden",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "User",
    "name": "GetUsersCurrent"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get Specific User",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"email\": \"john@doe.com\",\n  \"username\": \"John\",\n  \"token\": \"fmkmfimvmf3rmi3ri3vnc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 403 Forbidden",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "User",
    "name": "GetUsersId"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Register for an account",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"john@doe.com\",\n  \"password\": \"p@ssword\",\n  \"username\": \"John\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"email\": \"john@doe.com\",\n  \"username\": \"John\",\n  \"token\": \"fmkmfimvmf3rmi3ri3vnc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Insufficient parameters",
          "content": "HTTP/1.1 422 Unprocessible Entity",
          "type": "json"
        },
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 500 Internal Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "User",
    "name": "PostUsers"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login to account",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"password\": \"p@ssword\",\n  \"username\": \"John\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"email\": \"john@doe.com\",\n  \"username\": \"John\",\n  \"token\": \"fmkmfimvmf3rmi3ri3vnc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Insufficient parameters",
          "content": "HTTP/1.1 422 Unprocessible Entity",
          "type": "json"
        },
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "HTTP/1.1 500 Internal Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc.js",
    "groupTitle": "User",
    "name": "PostUsersLogin"
  }
] });
