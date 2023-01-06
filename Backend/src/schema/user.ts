import {z} from 'zod'

export const userSchema=z.object({
    name:z.string({
        required_error:"Name is required"
    }).trim(),

    phone:z.string({
        required_error:"Phone is required"
    })
    // .regex(new RegExp('/^(03)[0-9]{9}$/'),"Invalid phone number1")
    .min(11,"Invalid phone number2")
    .max(11,"Invalid phone number3"),

    email:z.string({
        required_error:"Email is required"
    }).email("Invalid email"),

    password:z.string({
        required_error:"Password is required"
    }).min(5,"Password shouldbe at least 5 characters"),

    address:z.string({
        required_error:"Address is required"
    })
})