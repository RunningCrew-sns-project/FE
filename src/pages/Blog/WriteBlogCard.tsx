import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { uploadFiles } from '../../api/image/api';
import Button from '../../components/Button';
import UploadImage from '../../components/UploadImage';
import { bloginputfields } from '../../const/bloginputfields';
import BlogInput, { BlogInputProps } from './BlogInput';
import { useMutation } from "@tanstack/react-query";
import { updateBlog, writeBlog } from '../../api/blog/api';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export type BlogCardInput = {
    title: string;
    content: string;
    record: number | undefined;
    distance: number | undefined;
    imageUrl: string[];
    isEdit?: boolean
}

type WriteBlogCardProps = {
    content?: string;
    blogId?: number;
    distance?: number | undefined;
    imageUrl?: string[];
    record?: number | undefined;
    title?: string;
    isEdit?: boolean
};


const WriteBlogCard = ({ content, blogId, distance, imageUrl, record, title, isEdit }: WriteBlogCardProps) => {

    const queryClient = useQueryClient();
    console.log('writeblog', content, distance, blogId)
    const { mutate } = useMutation({
        mutationFn: writeBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
        onError: () => {
            console.error("블로그 작성 실패:");
        },
    })

    const { mutate: editBlog } = useMutation({
        mutationFn: updateBlog,
        onSuccess: () => {
            toast.success("블로그가 수정되었습니다.");
            navigate('/myPage/myFeed')
        },
        onError: () => {
            toast.error("수정 실패 !");
            console.error("에러 내용:");
        },
    });


    const {
        setValue,
        // getValues
    } = useForm<BlogCardInput>()

    const navigate = useNavigate();
    const [blogImages, setblogImages] = useState(imageUrl || []);;

    const methods = useForm<BlogInputProps>();

    useEffect(() => {
        if (isEdit) {
            setValue('title', title || '');
            setValue('content', content || '');
            setValue('distance', distance || 0);
            setValue('record', record || 0);
            setValue('imageUrl', imageUrl || []);
        }
    }, [isEdit, title, content, distance, record, imageUrl, setValue]);


    const onSubmit = async (BlogCardData: BlogCardInput) => {

        try {
            const fileUrls = await uploadFiles(
                'http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage',
                blogImages,
                { directory: 'blog_images', big: false }
            );

            console.log(fileUrls)
            BlogCardData["imageUrl"] = fileUrls
            console.log('BlogData', BlogCardData)

            // const currentValues = getValues();
            const writeBlogData = {
                title: BlogCardData.title,
                content: BlogCardData.content,
                distance: BlogCardData.distance,
                record: BlogCardData.record,
                imageUrl: BlogCardData.imageUrl
            };

            if (isEdit) {
                editBlog({ updateblogData: writeBlogData, blogId })
                toast.success("블로그가 수정되었습니다.");
                navigate('/myPage/myFeed')
            } else {
                mutate(writeBlogData);
                toast.success('블로그 작성완료되었어요!')
                navigate(`/blog`);
            }

        } catch (error) {
            console.error('파일 업로드 에러:', error);
        }



    }
    return (
        <>
            <div className="flex flex-col items-center mb-20">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        {bloginputfields.map((blogfield, index) => (
                            <div
                                key={index}
                                className="w-[320px] tablet:w-[640px] laptop:w-[800px] desktop:w-[800px]"
                            >
                                <BlogInput
                                    type={blogfield.type}
                                    name={blogfield.name}
                                    label={blogfield.label}
                                    required={blogfield.required}
                                    placeholder={blogfield.placeholder}
                                    content={content}
                                    title={title}
                                    distance={distance}
                                    record={record}
                                    isEdit={isEdit}
                                />
                            </div>
                        ))}

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
                            buttonpositionClassName="mr-0"
                            buttonClassName="px-6 py-2 transition-colors rounded-xl hover:opacity-80 text-md font-bold bg-[#BFFF00]"
                            imgUrl={blogImages}
                        ></UploadImage>
                        <div>
                            <Button theme="primary" className="bg-[#BFFF00]" type="submit">	{isEdit ? '수정하기' : '등록하기'}</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>

    );

};

export default WriteBlogCard;