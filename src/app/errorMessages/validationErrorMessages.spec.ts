import { ValidationErrorMessages } from "./validationErrorMessages";

describe("ValidationErrorMessages", () => {

    it("contains required message", () => {
        let key: string = "required";
        let value: any = true;
        let label = "myLabel";

        let func = ValidationErrorMessages.get(key);
        let r = func(label, value);

        expect(r).toBe("Wartość w polu 'myLabel' jest wymagana");
    });

    it("contains minlength message", () => {
        let key: string = "minlength";
        let value: any = { "requiredLength": 4, "actualLength": 1 };
        let label = "myLabel";

        let func = ValidationErrorMessages.get(key);
        let r = func(label, value);

        expect(r).toBe("Pole 'myLabel' musi zawierać co najmniej 4 znaków.");
    });

});