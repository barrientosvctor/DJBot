import fs from "fs";

function setProperty(object: any, key: string, value: any) {
    let properties = key.split('.');
    let index = 0;

    for (; index < properties.length - 1; ++index) {
        object = object[properties[index]];
    };

    return object[properties[index]] = value;
};
function getProperty(object: any, key: any) {
    let properties = key.split('.');
    let index = 0;

    for (; index < properties.length; ++index) {
        object = object && object[properties[index]];
    };

    return object;
};

export class Database {
    private filePath: string;
    private data: Record<string, any>;

    private fetchDataFromFile() {
        let savedData = JSON.parse(fs.readFileSync(this.filePath).toString());

        if (typeof savedData === `object`) {
            this.data = savedData;
        };
    };
    private saveDataToFile() {
        return fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), `utf-8`);
    };

    public get(key: string) {
        return getProperty(this.data, key);
    };
    public set(key: string, value: any) {
        setProperty(this.data, key, value);

        return this.saveDataToFile();
    };
    public has(key: string) {
        return Boolean(getProperty(this.data, key));
    };
    public delete(key: string) {
        delete this.data[key];

        return this.saveDataToFile();
    };
    public add(key: string, count: number) {
        if (!this.data[key]) {
            this.data[key] = 0;
        };

        this.data[key] += count;

        return this.saveDataToFile();
    };
    public subtract(key: string, count: number) {
        if (!this.data[key]) {
            this.data[key] = 0;
        };

        this.data[key] -= count;

        return this.saveDataToFile();
    };
    public push(key: string, element: any) {
        if (!this.data[key]) {
            this.data[key] = [];
        };

        this.data[key].push(element);

        return this.saveDataToFile();
    };
    public clear() {
        this.data = {};

        return this.saveDataToFile();
    };
    public all() {
        return Object.keys(this.data).map((key) => {
            return {
                key,
                data: this.data[key],
            };
        });
    };

    constructor(path: string) {
        this.filePath = path;
        this.data = {};

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, `{}`, `utf-8`);
        } else {
            this.fetchDataFromFile();
        };
    };
};
