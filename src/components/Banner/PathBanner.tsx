import useBanner from "../../hook/usebanner";

const PathBanner = () => {
    const banner = useBanner();

    return (
        <div className="relative w-full h-[180px] tablet:h-[300px] laptop:h-[300px] desktop:h-[300px] ">
            {banner ? (
                <>
                    <img
                        src={banner.img}
                        alt={banner.title}
                        className="w-full h-full object-cover max-w-[1920px] mx-auto"
                    />
                    <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl sm:text-4xl lg:text-5xl font-bold">
                        {banner.title}
                    </h1>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default PathBanner;
