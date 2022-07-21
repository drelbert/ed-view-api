import { crudControllers } from '../../utils/crud.mjs'
import { Student } from './student.model.mjs'

// controller is middleware, but intent to return data
// data can be from db or other resource/service

// where use case requires overidding the export default, use
// export default {
//     ...crudControllers(Student)
//     getOne(){
//          use case code goes here
//     }
// }
// export the crudControllers and passing in the object: Student
export default crudControllers(Student)
