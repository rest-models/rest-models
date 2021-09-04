import { AxiosRequestConfig } from "axios";
import { Model } from "./Model";
export declare class Collection<T> {
    private url;
    private data;
    constructor(url: string);
    private setData;
    get list(): Model<T>[];
    get rawList(): T[];
    fetch(params?: AxiosRequestConfig["params"]): Promise<void>;
    fetchOne(primaryKey: number | string): Promise<Model<T>>;
    get(primaryKey: number | string): Model<T>;
    private createModel;
}
