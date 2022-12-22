

export default {
  "meta": {},
  "id": "_default",
  "_regex": {},
  "_paramKeys": {},
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_book",
      "_regex": {},
      "_paramKeys": {},
      "name": "book",
      "module": false,
      "file": {
        "path": "src/routes/book",
        "dir": "src/routes",
        "base": "book",
        "ext": "",
        "name": "book"
      },
      "children": [
        {
          "meta": {
            "dynamic": true
          },
          "id": "_default_book__name__svelte",
          "_regex": {},
          "_paramKeys": {},
          "name": "[name]",
          "file": {
            "path": "src/routes/book/[name].svelte",
            "dir": "src/routes/book",
            "base": "[name].svelte",
            "ext": ".svelte",
            "name": "[name]"
          },
          "asyncModule": () => import('../src/routes/book/[name].svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_book_confirm_svelte",
          "_regex": {},
          "_paramKeys": {},
          "name": "confirm",
          "file": {
            "path": "src/routes/book/confirm.svelte",
            "dir": "src/routes/book",
            "base": "confirm.svelte",
            "ext": ".svelte",
            "name": "confirm"
          },
          "asyncModule": () => import('../src/routes/book/confirm.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_cart_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "cart",
      "file": {
        "path": "src/routes/cart.svelte",
        "dir": "src/routes",
        "base": "cart.svelte",
        "ext": ".svelte",
        "name": "cart"
      },
      "asyncModule": () => import('../src/routes/cart.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_home_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "home",
      "file": {
        "path": "src/routes/home.svelte",
        "dir": "src/routes",
        "base": "home.svelte",
        "ext": ".svelte",
        "name": "home"
      },
      "asyncModule": () => import('../src/routes/home.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_images_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "images",
      "file": {
        "path": "src/routes/images.svelte",
        "dir": "src/routes",
        "base": "images.svelte",
        "ext": ".svelte",
        "name": "images"
      },
      "asyncModule": () => import('../src/routes/images.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_index_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_list_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "list",
      "file": {
        "path": "src/routes/list.svelte",
        "dir": "src/routes",
        "base": "list.svelte",
        "ext": ".svelte",
        "name": "list"
      },
      "asyncModule": () => import('../src/routes/list.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_login_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "login",
      "file": {
        "path": "src/routes/login.svelte",
        "dir": "src/routes",
        "base": "login.svelte",
        "ext": ".svelte",
        "name": "login"
      },
      "asyncModule": () => import('../src/routes/login.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_property",
      "_regex": {},
      "_paramKeys": {},
      "name": "property",
      "module": false,
      "file": {
        "path": "src/routes/property",
        "dir": "src/routes",
        "base": "property",
        "ext": "",
        "name": "property"
      },
      "children": [
        {
          "meta": {
            "dynamic": true
          },
          "id": "_default_property__name__svelte",
          "_regex": {},
          "_paramKeys": {},
          "name": "[name]",
          "file": {
            "path": "src/routes/property/[name].svelte",
            "dir": "src/routes/property",
            "base": "[name].svelte",
            "ext": ".svelte",
            "name": "[name]"
          },
          "asyncModule": () => import('../src/routes/property/[name].svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_register_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "register",
      "file": {
        "path": "src/routes/register.svelte",
        "dir": "src/routes",
        "base": "register.svelte",
        "ext": ".svelte",
        "name": "register"
      },
      "asyncModule": () => import('../src/routes/register.svelte'),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true
      },
      "_regex": {},
      "_paramKeys": {},
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}