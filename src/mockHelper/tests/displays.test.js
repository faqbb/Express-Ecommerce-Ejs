import Supertest from 'supertest'
import Chai from 'chai'

const expect = Chai.expect;

const requester = Supertest('http://localhost:8080')

describe('display testing', () => {
    describe('POST', () => {
        it('test login to access', () =>{
            requester
            .post('/api/login')
            .send({'email': 'testingemail@.com', 'password': 'testpassword123' })
            expect(requester.body.email).to.be.equal('testingemail@.com')
            })
        })
    describe('GET', () => {
        it('test products display', async() =>{
            let response = await requester.get('api/products')
            expect(response.body).to.exist
        })
        it('test cart display', async() => {
            let response = await requester.get('api/cart')
            expect(response.body).to.exist
        })
    })    
})