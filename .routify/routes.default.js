

export default {
  "meta": {},
  "id": "_default",
  "name": "",
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
      "id": "_default_account_svelte",
      "name": "account",
      "file": {
        "path": "src/routes/account.svelte",
        "dir": "src/routes",
        "base": "account.svelte",
        "ext": ".svelte",
        "name": "account"
      },
      "asyncModule": () => import('../src/routes/account.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_apartment_svelte",
      "name": "apartment",
      "file": {
        "path": "src/routes/apartment.svelte",
        "dir": "src/routes",
        "base": "apartment.svelte",
        "ext": ".svelte",
        "name": "apartment"
      },
      "asyncModule": () => import('../src/routes/apartment.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_bills_svelte",
      "name": "bills",
      "file": {
        "path": "src/routes/bills.svelte",
        "dir": "src/routes",
        "base": "bills.svelte",
        "ext": ".svelte",
        "name": "bills"
      },
      "asyncModule": () => import('../src/routes/bills.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_book",
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
            "dynamic": true,
            "order": false
          },
          "id": "_default_book__name__svelte",
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
      "id": "_default_booking",
      "name": "booking",
      "module": false,
      "file": {
        "path": "src/routes/booking",
        "dir": "src/routes",
        "base": "booking",
        "ext": "",
        "name": "booking"
      },
      "children": [
        {
          "meta": {
            "dynamic": true,
            "order": false
          },
          "id": "_default_booking__id__svelte",
          "name": "[id]",
          "file": {
            "path": "src/routes/booking/[id].svelte",
            "dir": "src/routes/booking",
            "base": "[id].svelte",
            "ext": ".svelte",
            "name": "[id]"
          },
          "asyncModule": () => import('../src/routes/booking/[id].svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_cart_svelte",
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
      "id": "_default_filter_svelte",
      "name": "filter",
      "file": {
        "path": "src/routes/filter.svelte",
        "dir": "src/routes",
        "base": "filter.svelte",
        "ext": ".svelte",
        "name": "filter"
      },
      "asyncModule": () => import('../src/routes/filter.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_home_svelte",
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
      "id": "_default_image",
      "name": "image",
      "module": false,
      "file": {
        "path": "src/routes/image",
        "dir": "src/routes",
        "base": "image",
        "ext": "",
        "name": "image"
      },
      "children": [
        {
          "meta": {
            "dynamic": true,
            "order": false
          },
          "id": "_default_image__name__svelte",
          "name": "[name]",
          "file": {
            "path": "src/routes/image/[name].svelte",
            "dir": "src/routes/image",
            "base": "[name].svelte",
            "ext": ".svelte",
            "name": "[name]"
          },
          "asyncModule": () => import('../src/routes/image/[name].svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_images_svelte",
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
      "meta": {
        "isDefault": true
      },
      "id": "_default_index_svelte",
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
      "id": "_default_loading_svelte",
      "name": "loading",
      "file": {
        "path": "src/routes/loading.svelte",
        "dir": "src/routes",
        "base": "loading.svelte",
        "ext": ".svelte",
        "name": "loading"
      },
      "asyncModule": () => import('../src/routes/loading.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_login_svelte",
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
      "id": "_default_order",
      "name": "order",
      "module": false,
      "file": {
        "path": "src/routes/order",
        "dir": "src/routes",
        "base": "order",
        "ext": "",
        "name": "order"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_order_create_svelte",
          "name": "create",
          "file": {
            "path": "src/routes/order/create.svelte",
            "dir": "src/routes/order",
            "base": "create.svelte",
            "ext": ".svelte",
            "name": "create"
          },
          "asyncModule": () => import('../src/routes/order/create.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_pay_svelte",
      "name": "pay",
      "file": {
        "path": "src/routes/pay.svelte",
        "dir": "src/routes",
        "base": "pay.svelte",
        "ext": ".svelte",
        "name": "pay"
      },
      "asyncModule": () => import('../src/routes/pay.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_property",
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
            "dynamic": true,
            "order": false
          },
          "id": "_default_property__name__svelte",
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
      "meta": {},
      "id": "_default_search_svelte",
      "name": "search",
      "file": {
        "path": "src/routes/search.svelte",
        "dir": "src/routes",
        "base": "search.svelte",
        "ext": ".svelte",
        "name": "search"
      },
      "asyncModule": () => import('../src/routes/search.svelte'),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true,
        "order": false
      },
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