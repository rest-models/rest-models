import { Model } from "./Model";
export declare class Collection<T> {
    private url;
    private data;
    constructor(url: string);
    private setData;
    get list(): Model<T>[];
    fetch(params?: Record<string, unknown>): Promise<void>;
    get(primaryKey: number | string): Promise<Model<T>>;
    private createModel;
}
