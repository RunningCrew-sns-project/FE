import { http } from "../request";

// export const getAllblogs = async () => {
//     const response = await http.get(`/api/blog`);
//     return response;
// }

export const getAllblogs = async ({ pageParam = null }) => {
    const cursor = pageParam;  
    console.log('cursor:', cursor);
    const response = await http.get(`/api/blog?size=10&cursor=${cursor || ''}&isMyBlog=false`);
    return response; 
};

export const writeBlog = async (blogData) => {
    const response = await http.post(`/api/blog`,blogData);
    return response;
} 

export const getBlogdetail = async (blogId:number) => {
    const response = await http.get(`/api/blog/${blogId}`);
    return response;
}

export const updateBlog = async ({updateblogData,blogId}) => {
    const response = await http.put(`/api/blog?blogId=${blogId}`,updateblogData);
    return response;
} 