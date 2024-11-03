import { http } from "../request";

export const changeblogLike = async (blogId:number) => {
    const response = await http.post(`/api/blog/like/${blogId}`);
    return response;
}

export const geAllblogs = async () => {
    const response = await http.get(`/api/blog`);
    return response;
}

export const writeBlog = async () => {
    const response = await http.post(`/api/blog`);
    return response;
} 

export const updateBlog = async (blogId:number) => {
    const response = await http.put(`/api/blog/${blogId}`);
    return response;
}

export const deleteBlog = async (blogId:number) => {
    const response = await http.delete(`/api/blog/${blogId}`);
    return response;
}

export const getBlogdetail = async (blogId:number) => {
    const response = await http.delete(`/api/blog/${blogId}`);
    return response;
}