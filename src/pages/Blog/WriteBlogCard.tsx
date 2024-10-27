import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { uploadFiles } from '../../api/image/api';
import Button from '../../components/Button';
import UploadImage from '../../components/UploadImage';



type BlogCardInput = {
    title: string;
    content: string;
    record: string;
    distance: string;
    imageUrl: string;
}


const WriteBlogCard = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<BlogCardInput>()

    const [blogImages, setblogImages] = useState([]);

    const onSubmit = async (BlogCardData: BlogCardInput) => {
        console.log('BlogCard작성')

        try {
            const fileUrls = await uploadFiles(
                'http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage',
                blogImages,
                { directory: 'blog_images', big: false }
            );
            console.log('내가 업로드한 fileUrls', fileUrls);

            //todo.fileUrl을 블로그 작성 api imageurl에 추가해서 연동 

            console.log('BlogData', BlogCardData)
            BlogCardData["imageUrl"] = fileUrls
            console.log('BlogData with img', BlogCardData)

        } catch (error) {
            console.error('파일 업로드 에러:', error);
        }



    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>제목</label>
                    <input className="border border-2 border-slate-300 p-2 rounded-md w-96" {...register("title")} />
                </div>

                <div>
                    <label>내용</label>
                    <textarea className="border border-2 border-slate-300 p-2 rounded-md w-96" {...register("content")} />
                </div>

                <div>
                    <label>기록</label>
                    <textarea placeholder="hh:mm:ss"
                        maxLength={8}
                        className="border border-2 border-slate-300 p-2 rounded-md w-48" {...register("record")} />
                </div>

                <div>
                    <label>거리</label>
                    <textarea className="border border-2 border-slate-300 p-2 rounded-md w-96" {...register("distance")} />
                </div>

                <UploadImage
                    id="blog"
                    onUploadFiles={(formData) => {
                        setblogImages(formData);
                    }}
                    multiple={true}
                    uploadfileLength={4}
                    imgpreviewWidth={250}
                    imgpreviewHeight={250}
                    imgClassName="object-cover w-full h-full rounded-lg"
                    buttonpositionClassName="mr-14"
                    buttonClassName="px-6 py-2 transition-colors rounded-xl hover:opacity-80 text-md font-bold bg-red-500"
                ></UploadImage>
                <div>
                    <Button className="bg-blue-500" type="submit">완료</Button>
                </div>
            </form>
        </>
    );

};

export default WriteBlogCard;