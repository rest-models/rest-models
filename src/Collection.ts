import { AxiosRequestConfig } from "axios";
import { makeAutoObservable } from "mobx";
import { api } from "./api";
import { Model } from "./Model";

export class Collection<T> {
  private data: Model<T>[] = [];

  constructor(private url: string) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private setData(data: Model<T>[]) {
    this.data = data;
  }

  get list() {
    return this.data;
  }

  get rawList() {
    return this.data.map((model) => model.get() as T);
  }

  async fetch(params?: AxiosRequestConfig["params"]) {
    try {
      const response = await api.get<T[]>(this.url, {
        params,
      });

      const newData = response.data.map((data) => {
        return this.createModel(data);
      });

      this.setData(newData);
    } catch (error) {
      throw new Error(`Failed to fetch new data! \n\n ${error.message}`);
    }
  }

  async fetchOne(primaryKey: number | string) {
    try {
      const response = await api.get<T>(`${this.url}/${primaryKey}`);

      return this.createModel(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch data! \n\n ${error.message}`);
    }
  }

  get(primaryKey: number | string) {
    return this.list.find((data) => data.id === primaryKey);
  }

  private createModel(initialData: T) {
    return new Model<T>({ url: this.url }, initialData);
  }
}
