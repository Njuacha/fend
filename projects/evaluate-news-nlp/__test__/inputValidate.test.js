import {isInputValid} from '../src/client/js/inputValidate'

test("Testing the isInputValid(text) function", () => {
     const emptyText = "  ";
     const nonEmptyText = "text";
     expect(isInputValid(emptyText)).toBeFalsy();
     expect(isInputValid(nonEmptyText)).toBeTruthy();
})
