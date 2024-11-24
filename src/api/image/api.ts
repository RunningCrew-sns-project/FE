import { http } from "../request";


export const uploadFiles = async (url:string, files: FormData | string[] , params :{})=>{
    try{
        const response = await  http.post(url, files, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params, 
        });
        return response.data.success.responseData.map((file: { fileUrl: string }) => file.fileUrl);

    }
    catch (error) {
        console.log('에러', error)
    }

}

export const uploadCrewFiles = async (url:string, files :  FormData | string[], params:{})=>{
    try{
        const response = await  http.post(url, files, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params, 
        });
        return response.data.success.responseData

    }
    catch (error) {
        console.log('에러', error)
    }

}


