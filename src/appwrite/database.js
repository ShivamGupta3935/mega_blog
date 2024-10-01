import { Client, Account, ID, Databases, Query} from 'appwrite';
import conf from '../conf/conf'

export class AppwriteService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({title, slug, content, featuredImage, userId, status}){
        try {
            return await this.databases.createDocument(conf.appwrite_database_id,
            conf.appwrite_collection_id,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
            )
        } catch (error) {
            console.log("appwrite database :: createPost :: error ", error);
            
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status
                }
            )
        } catch (error) {
            console.log('appwrite databases service :: update post :: error : ', error);
            
        }
    }

    async deletePost({slug}){
        try {
                await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
            return true;
        } catch (error) {
            console.log( "appwrite database service :: deletePost :: error", error);            
        }
        return false
    }

    async getPost(slug){
       try {
         return await this.databases.getDocument(
            conf.appwrite_database_id,
            conf.appwrite_collection_id,
            slug    
         ) 
         return true
       } catch (error) {
          console.log("appwrite service :: getPost :: error : ", error);          
       }
       return false
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
       try {
        return await this.databases.listDocuments(
            conf.appwrite_database_id,
            conf.appwrite_collection_id,
            queries
        )
       } catch (error) {
        console.log( "appwrite service :: getall post :: error : ",error);
        
       }
    }

   // file upload service 
   async fileUpload(file){
       try {
          await this.bucket.createFile(
            conf.appwrite_bucket_id,
            ID.unique(),
            file
          )
       } catch (error) {
          console.log("appwrite service :: upload file :: error : ", error);          
          return false
       }
   }

   async deleteFile(fileId){
      try {
        await this.bucket.deleteFile(
            conf.appwrite_bucket_id,
            fileId
            
        )
        return true
      } catch (error) {
        console.log("appwrite service :: delete file :: error ", error);
        return false
      }
   }

   getFilePreview(fileId){
     return this.bucket.getFilePreview(
        conf.appwrite_bucket_id,
        fileId
      )
   }
}


const appwriteService = new AppwriteService();
export default appwriteService;