import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const baseURL:string = process.env.NODE_ENV === "development" ? "/dev-api" : "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http";

export class Interceptors{
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
        });
    }
    init(){
        this.instance.interceptors.request.use(
            (config) => {
                const Authorization:string = "Bearer "+localStorage.getItem("token");
                if(config.url === "https://upload-z1.qiniup.com"){
                    config={
                        headers:{
                            "Content-Type": "multipart/form-data"
                        }
                    }
                }
                const whiteList = ["/","/login","/register"]
                if (whiteList.findIndex(v => v === config.url) === -1) {
                    config = {
                        headers: {
                            "Authorization":Authorization
                        }
                    }
                }
                return config
            },
            error => {
                console.log(error)
            }
        )
        this.instance.interceptors.response.use(
            config => {
                return config
            },
            error => {
                console.log(error)
            }
        )
    }
    getInterceptors() {
        return this.instance;
    }
}
