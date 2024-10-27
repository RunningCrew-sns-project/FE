import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { uploadFiles } from '../../api/image/api';
import Button from '../../components/Button';
import UploadImage from '../../components/UploadImage';



type BlogCardInput = {
}


const WriteBlogCard = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BlogCardInput>()

    const [blogImages, setblogImages] = useState([]);
    const onSubmit = async () => {
        console.log('BlogCard작성')

        //todo. formdata 전달
        /* ex) request body 요청 데이터 
            {
            "title": "블로그 제목 입력",
            "content": "블로그 내용 입력",
            "record": "HH:mm:ss",
            "distance": "0.0km",
            "imageUrl": "https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"
            }
        */

        /* 이미지 업로드 api/storage post 요청*/
        try {
            const fileUrls = await uploadFiles(
                'http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage',
                blogImages,
                { directory: 'blog_images', big: false }
            );
            console.log('내가 업로드한 fileUrls', fileUrls);

            //todo.fileUrl을 블로그 작성 api imageurl에 추가해서 연동 


        } catch (error) {
            console.error('파일 업로드 에러:', error);
        }



    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>제목</label>
                <input className="border border-2 border-slate-300 p-2 rounded-md w-96" {...register("title")} />
            </div>

            <div>
                <label>내용</label>
                <textarea className="border border-2 border-slate-300 p-2 rounded-md w-96" {...register("content")} />
            </div>

            <UploadImage
                id="blog"
                onUploadFiles={(formData) => {
                    setblogImages(formData);
                }}
                multiple
                uploadfileLength={4}
                imgpreviewWidth={250}
                imgpreviewHeight={250}
            ></UploadImage>

            <div>
                <Button className="bg-blue-500" type="submit">완료</Button>
            </div>
        </form>
    );
};

export default WriteBlogCard;