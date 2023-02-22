interface ErrorHandler extends Error{
    status?:number,
    message:string
}

export const createError=(status : number,message  :string)=>{
    let error = new Error() as ErrorHandler;
    error.status = status;
    error.message = message;
    console.log("hehehehehehe")
    return error;
}