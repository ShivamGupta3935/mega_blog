import { Client, Account, ID} from 'appwrite';
import conf from '../conf/conf'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwrite_project_id)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
       await this.account.create( ID.unique(),email, password, name)

       if (createAccount) {
          //call another method for login
          return this.login({email, password})

       }else{
          console.log("Create Account :: error :: message :", error);          
       }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Login :: error :: message:", error);
            throw error
            
        }
    }

    async getCurrentStatus(){
        try {
            await this.account.get();
        } catch (error) {
            console.log("appwrite :: getCurrentstatus :: error", error);            
        }
    }

    async deleteAccount(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite :: deleteSession :: error: ", error);
            
        }
    }
}

const authService = new AuthService()

export default AuthService;