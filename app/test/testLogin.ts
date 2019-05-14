import '../db/sequelize';
import { Login } from '../controller/account/login';

setTimeout(()=>{
    Login.login({token:'test'}).then((r)=>{console.log(r)})
},3000);
