import Button from "../../../components/Button";

const LocationFilter = () => {
    const location = ["서울", "경기", "부산", "대구", "강원", "대전", "공주", "전주", "춘천"];

    return (
        <div className="flex flex-wrap gap-2 justify-start">
            {location.map((item, index) => (
                <Button
                    theme="primary"
                    key={index}
                    className="text-sm flex-1 min-w-[100px] max-w-[150px]" // 최소 및 최대 너비 설정
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};

export default LocationFilter;
