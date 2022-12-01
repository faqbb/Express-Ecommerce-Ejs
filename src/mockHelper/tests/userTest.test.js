import Supertest, { agent } from 'supertest'
import Chai from 'chai'

const expect = Chai.expect;

const requester = Supertest('http://localhost:8080')

describe('Product testing', () => {
    describe('GETS', () => {
        before(function(done){
            requester
            .post('/api/login')
            .send({'email': 'testingemail@.com', 'password': 'testpassword123' })
            .end(function(err,res) {
                if (err) return done(err)
                done()
            })

        })
        it('test products display', async() =>{
            let response = await requester.get('api/products')
            expect(response.body).to.exist(1)
        })
    })
})