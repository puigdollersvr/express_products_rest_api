const app = require("./app")

const port = 9000

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`))
}