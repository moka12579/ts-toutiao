import {AxiosPromise,AxiosResponse} from "axios";
import {Interceptors} from "@/utils/interceptors";

const baseURL:string = process.env.NODE_ENV === "development" ? "/dev-api" : "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http";

export class HttpServer {
    axios:any;
    constructor() {
        this.axios = new Interceptors().getInterceptors()
    }
    request(config:any): AxiosPromise{
        return new Promise((resolve, reject) => {
            this.axios(config).then((res: AxiosResponse) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err)
            });
        })
    }
}

const http = new HttpServer()

export default http