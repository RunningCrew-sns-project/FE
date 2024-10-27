import axios from 'axios'

export const uploadFiles = async (url, files, params)=>{
    try{
        const response = await axios.post(url, files, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params, 
        });
        return response.data.success.responseData.map(file => file.fileUrl);

    }
    catch (error) {
        console.log('에러', error)
    }

}

//이건 이미 블로그 작성완료한다음에 작성완료한 블로그에서 사진을 빼고 싶을때 사용..  ->블로그 수정 api에서 추가하기 
export const deleteFile = async (url,params)=>{
    try{
        const response = await axios.delete(url, {
            params, 
        });
        console.log('삭제완료')

    }
    catch (error) {
        console.log('에러', error)
    }

}