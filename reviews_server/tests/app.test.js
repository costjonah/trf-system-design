const app = require('../app.js')
const request = require('supertest')



describe('Testing get reviews endpoint', function() {
  it('Should return "Missing Product ID" if Product_id is missing', async () => {
    const res = await request(app).get('/api/reviews/?product_id=&sort=newest')
    expect(res.statusCode).toEqual(422)
    expect(res.error.text).toBe('Missing Product ID')
  })

  it('Should return Reviews if Product_id is provided', async () => {
    const res = await request(app).get('/api/reviews/?product_id=3&sort=newest')
    const responseData = JSON.parse(res.text)
    expect(res.statusCode).toEqual(200)
    expect(responseData.product).toBe('3')
    expect(responseData.count).toEqual(5)
  })

  it('Should return error IF sort parameter is invalid', async () => {
    const res = await request(app).get('/api/reviews/?product_id=3&sort=lol')
    expect(res.error.text).toBe('Invalid sort parameter')
  })

  it('Should return up to the stated count parameter but not more', async () => {
    const res = await request(app).get('/api/reviews/?product_id=3&count=1')
    let result = JSON.parse(res.text)
    expect(result.results.length).toEqual(1)
    expect(res.status).toEqual(200)
  })

})

describe('Testing get meta endpoint', function() {
  it('Should return "Invalid product_id" if product_id is not provided', async () => {
    const res = await request(app).get('/api/reviews/meta/')
    expect(res.status).toEqual(422)
  })
  it('Should return meta data in the correct structure', async () => {
    const res = await request(app).get('/api/reviews/meta/?product_id=1')
    let results = JSON.parse(res.text)
    expect(results.product_id).toBe("1")
    expect(typeof results.rating).toBe('object')
    expect(typeof results.recommended).toBe('object')
    expect(typeof results.characteristics).toBe('object')
  })
})

describe('Testing put review helpful', function() {
  it('Should return error if review_id is not provided', async () => {
    const res = await request(app).put('/api/reviews//helpful')
    expect(res.status).toEqual(404)
  })
})

describe('Testing put review report', function() {
  it('Should return error if review_id is not provided', async () => {
    const res = await request(app).put('/api/reviews//report')
    expect(res.status).toEqual(404)
  })
})
