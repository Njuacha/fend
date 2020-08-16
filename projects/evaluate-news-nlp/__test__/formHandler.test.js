import {isInputValid, formatTextForMeaningCloudApi, postData} from '../src/client/js/formHandler'


describe("Testing the extra methods needed", () => {


     test("Testing the formatTextForMeaningCloudApi(text) function", () => {
          const text = "I am in wrong format";
          const formatedText = escape(text.trim());
          expect(formatTextForMeaningCloudApi(text)).toBe(formatedText);
     })

     // test("Testing the postData function", async () => {
     //      const newData = await postData("This a nice car");
     //      expect(newData.status.code).toBe("0");
     // })
});
