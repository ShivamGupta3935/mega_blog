import { Client, Account, ID} from 'appwrite';
import conf from "../conf.js"

export class Authservice{
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(this.appwriteUrl)
        .setProject(this.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
         try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method to login
                return this.login({email, password});

            }else{
                return userAccount;
            }
         } catch (error) {
            throw error
            console.log("something went wrong");
            
         }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            throw error
            console.log("error when login", error);
            
        }
    }

    //current user 
    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log("Error occur appwrite service to getcurrent user ", error);
            throw error            
        }

        return null
    }

    //logout 
    async logout(){
        try {
           await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: logout :: error ", error);
            
        }
    }
}