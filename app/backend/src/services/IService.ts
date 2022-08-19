export interface IService<T> {
  create(props: any): Promise<T>
}
