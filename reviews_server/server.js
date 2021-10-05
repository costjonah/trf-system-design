const app = require('./app.js')
const port = process.env.PORT || 3001

app.listen(3001,()=>{console.log('connected')})