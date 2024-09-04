export interface _ResultResponse<T> {
    isValid:boolean;
    errorCode?:number;
    errorMessage?:string;
    result?:T;
}