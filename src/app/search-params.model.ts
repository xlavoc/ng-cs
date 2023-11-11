export class SearchParams {
  constructor(
    public name?: string,
    public dateFrom?: string,
    public dateTo?: string,
    public isSuccess?: boolean,
  ) {}
}
