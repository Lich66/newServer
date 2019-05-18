export interface IResponse {
    code: number;
    data?: any;
    msg?: string;
    [key: string]: any;
}
