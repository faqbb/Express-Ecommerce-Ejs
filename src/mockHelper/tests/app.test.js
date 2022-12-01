import Todos from "../ToDos.js";
import Assert from 'assert'

const assert = Assert.strict

describe('Todos', () => {
    it('no tendria que haber todo', () => {
        const todos = new Todos()
        assert.strictEqual(todos.list().length, 0)
    })
    it('agrega un todo y no esta en true', () =>{
        const todos = new Todos()
        assert.strictEqual(todos.list().length, 0)
        assert.deepStrictEqual(todos.list(), [{title:'agrega un todo y no esta en true'}])
    })
})