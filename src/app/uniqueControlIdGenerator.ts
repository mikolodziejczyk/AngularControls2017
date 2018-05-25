export class uniqueControlIdGenerator {
    private static _id : number = 0;

    public static  getId() {
        uniqueControlIdGenerator._id++;
        let idString = `uniqueControlIdGenerator${uniqueControlIdGenerator._id}`;
        return idString;
    }

    public static  id(): string{
        return uniqueControlIdGenerator.getId();
    }
}