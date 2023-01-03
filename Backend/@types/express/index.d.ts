import { User } from "../../src/entities/User"
export{}

declare global{
    namespace Express{
        interface Request{
            user ?:any;
            cookie?:string
        }
    }
} 