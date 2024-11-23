import SlickSlider from "../../components/Slider/slider";

type ImgArrayProps = {
    imgarray: string[];
};


const DetailHeader = ({ imgarray }: ImgArrayProps) => {

    const sliderSettings = {
        dots: true,
        infinite: imgarray.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: false,
    };
    return (
        <>
            <div className="h-96 w-full tablet:w-[700px] laptop:w-[1100px] mx-auto bg-gradient-to-r relative overflow-x-hidden">
                <SlickSlider settings={sliderSettings}>
                    {imgarray.length > 0 ? imgarray.map((img: string, index: number) => (
                        <div key={index} className="w-full h-72">
                            <img
                                src={img}
                                alt="배경이미지"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    )) : <div>이미지없음</div>}
                </SlickSlider>
            </div>
        </>
    );
};

export default DetailHeader;