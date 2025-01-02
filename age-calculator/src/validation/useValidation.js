import {z} from 'zod';
export const useValidations=()=>{
   
   // write all validations schema here

   const joinForm=z.object({
    firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'First name must only contain alphabets.')
    .nonempty('First name is required.'),
  dob: z.string().nonempty('Date of birth is required.'),
  })
   







  
   
    return{
       
        joinForm,
       
    }
}