import { http } from "../request";

export const getAllblogs = async () => {
    const response = await http.get(`/api/blog`);
    return response;
}

export const writeBlog = async (blogData) => {
    const response = await http.post(`/api/blog`,blogData);
    return response;
} 

export const getBlogdetail = async (blogId:number) => {
    const response = await http.get(`/api/blog/${blogId}`);
    return response;
}