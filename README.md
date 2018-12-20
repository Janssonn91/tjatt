# Tjatt
Tjatt is chat application that has checkout function from GitHub

## Installation

```
$ npm install
```
## Development

Start development

```
$ npm start
```

### proxy setting

Set package.json for localhost
"proxy": {
    "/api$|/api/": {
      "target": "http://localhost:3101",
      "pathRewrite": {
        "^/api": "/"
      },

Set package.json for live server
"proxy": {
    "/api$|/api/": {
      "target": "https://tjatt.net/",
      "pathRewrite": {
        "^/api": "/"
      },

      