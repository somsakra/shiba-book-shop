# Shiba Book Shop

### [View the demo](https://somsakra.github.io/shiba-book-shop/)

### special discount only for all **Harry Potter** book series

- buy 2 unique series books discount **10%** of those 2 books
- buy 3 unique series books discount **11%** of those 3 books
- buy 4 unique series books discount **12%** of those 4 books
- buy 5 unique series books discount **13%** of those 5 books
- buy 6 unique series books discount **14%** of those 6 books
- buy 7 unique series books discount **15%** of those 7 books

## Example 1 :

```
  Harry Potter and the Philosopher's Stone (I)   x2     700
  Harry Potter and the Chamber of Secrets (II)   x1     350
  The Fork, the Witch, and the Worm              x1     260
                                           Discount      70
                                                Net    1240
```

## Example 2 :

```
  Harry Potter and the Philosopher's Stone (I)   x3    1050
  Harry Potter and the Chamber of Secrets (II)   x2     700
  The Fork, the Witch, and the Worm              x1     260
                                           Discount     140
                                                Net    1870
```

### How to run on local machine

- Clone the project

```
git clone https://github.com/somsakra/shiba-book-shop.git
```

- Install dependencies

```
npm install
```

- Run with Docker
  - run on port 80 http://localhost/

```
npm run build

docker-compose up
```

- If you don't have docker in your local-machine
  - run with _serve build_ http://localhost:5000/

```
npm run build

serve build
```

### Note

- Running on local machine can found the CORS issue. Please check permission policy on your API or use this ==> https://s3-ap-southeast-1.amazonaws.com/smallwill.com/shiba-book-shop.json

- Config API url in [.env](.env)

- See API example in [JSON File](shiba-book-shop.json)

### How to run test

```
npm run test
```

### How to deploy

`npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`

more deployment detail please see https://create-react-app.dev/docs/deployment/

## License

This project is open source and available under the [MIT License](LICENSE.md).
