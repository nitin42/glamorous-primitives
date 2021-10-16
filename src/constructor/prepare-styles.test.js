const rewire = require("rewire")
const prepare_styles = rewire("./prepare-styles")
const prepareStyles = prepare_styles.__get__("prepareStyles")
// @ponicode
describe("prepareStyles", () => {
    test("0", () => {
        let callFunction = () => {
            prepareStyles([1000, 1000, 1000])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            prepareStyles([10, 1000, 1000])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            prepareStyles([1, 1, 1])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            prepareStyles([10, 10, 1000])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            prepareStyles([1000, 1, 1000])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            prepareStyles(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
