import BlogCardFooter from "./BlogCardFooter";
import SlickSlider from "../../components/Slider/slider";

type BlogCardprops = {
    userName: string;
    userImg: string;
    blogId: number;
    title: string;
    content: string;
    record: string;
    distance: string;
    imageUrl: string[];
    likeCount: number;
    liked: boolean
    createdAt: string;
}

const BlogCard = (props: BlogCardprops) => {

    const sliderSettings = {
        dots: true,
        infinite: props.imageUrl.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: false,
    };

    return (
        <>
            <div className="h-screen bg-white p-6 rounded-lg shadow-md mx-4 tablet:mx-6 laptop:mx-auto max-w-[1100px] ">
                <div className="flex">
                    <img src={props.userImg}
                        className="w-12 h-12 rounded-full mt-3"></img>
                    <div className="ml-3 mt-6">{props.userName}</div>
                </div>
                <div>{props.title}</div>
                <div className="h-3/6 w-full tablet:w-[550px] laptop:w-[830px] mx-auto bg-gradient-to-r relative overflow-x-hidden">
                    <SlickSlider settings={sliderSettings}>
                        {props.imageUrl.map((img, index) => (
                            <div key={index} className="w-full h-72">
                                <img
                                    src={img}
                                    alt="배경이미지"
                                    className="w-full h-72 object-cover"
                                />
                            </div>
                        ))}
                    </SlickSlider>
                </div>
                <BlogCardFooter liked={props.liked} blogId={props.blogId} likeCount={props.likeCount}></BlogCardFooter>
                <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-100 rounded-lg divide-x divide-gray-300">
                    <div className="text-sm text-gray-600 pr-4">
                        <span className="font-semibold">기록:</span> {props.record}
                    </div>
                    <div className="text-sm text-gray-600 px-4">
                        <span className="font-semibold">거리:</span> {props.distance}
                    </div>
                    <div className="text-sm text-gray-600 pl-4">
                        <span className="font-semibold">작성일:</span> {props.createdAt}
                    </div>
                </div>
                <div className="mt-6 text-gray-800 text-sm leading-relaxed">{props.content}</div>
            </div>
        </>

    );
};

export default BlogCard;