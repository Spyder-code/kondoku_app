

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
      "id": "_default_property_detail_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "property-detail",
      "file": {
        "path": "src/routes/property-detail.svelte",
        "dir": "src/routes",
        "base": "property-detail.svelte",
        "ext": ".svelte",
        "name": "property-detail"
      },
      "asyncModule": () => import('../src/routes/property-detail.svelte'),
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