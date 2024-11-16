import Button from '../../components/Button';
import MapPage from '../../components/Map/Map';

interface DetailInfoProps {
    info: {};
    handlAskjoin: () => void;
    children: React.ReactNode;
    buttonText: string;
}


const DetailInfo = ({ info, children, handlAskjoin, buttonText }: DetailInfoProps) => {
    console.log('buttonText', buttonText)

    const locationData = {
        startCoordinates: { lat: info.inputLatitude, lng: info.inputLongitude },
        endCoordinates: { lat: info.targetLatitude, lng: info.targetLongitude },
        startAddress: info.inputLocation,
        endAddress: info.targetLocation
    };

    // console.log(locationData)

    return (
        <>
            <>
                {info.postType === '일반' ?
                    <>

                        <div className="bg-white p-4 rounded-lg shadow-md h-auto relative">
                            <h2 className="text-lg font-semibold mb-4 text-center">달리기 소개</h2>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="font-semibold">달리기명</div>
                                <div>{info.title}</div>
                                <div className="font-semibold">지역</div>
                                <div>{info.location}</div>
                                <div className="font-semibold">인원 현황</div>
                                <div>
                                    {info.people} / {info.maximumPeople}
                                </div>
                                <div className="font-semibold">시작시간</div>
                                <div>{info.startTime}</div>
                            </div>

                            <div className="col-span-2 mt-4">
                                <div className="font-semibold mb-1">달리기를 소개합니다</div>
                                <p className="text-gray-700 leading-relaxed">{info.content}</p>
                            </div>
                            <div className="flex flex-col col-span-2 mt-4">
                                <div className="font-semibold mb-1">달리기 장소</div>
                                <MapPage className="" locationData={locationData} />
                                <div className="flex justify-center mt-4">
                                    <Button className="bg-[#BFFF00] px-6 py-2 rounded-md" onClick={handlAskjoin}>
                                        {buttonText}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                    : info.postType === '크루' ?
                        <>
                            <div className="bg-white p-4 rounded-lg shadow-md h-96 w-full tablet:w-[700px] laptop:w-[1100px] mx-auto mb-6 relative">
                                <h2 className="text-lg font-semibold mb-4 text-center">크루별 달리기 소개</h2>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="font-semibold">크루명</div>
                                    <div>{info.crewName}</div>
                                    <div className="font-semibold">지역</div>
                                    <div>{info.activityRegion}</div>
                                    <div className="font-semibold">크루담당자</div>
                                    <div>{info.crewMaster}</div>
                                    <div className="font-semibold">인원 현황</div>
                                    <div>
                                        {info.memberCount} / {info.maxCapacity}
                                    </div>
                                </div>

                                <div className="col-span-2 mt-4">
                                    <div className="font-semibold mb-1">크루를 소개합니다</div>
                                    <p className="text-gray-700 leading-relaxed">{info.crewIntroduction}</p>
                                </div>

                                <div className="absolute bottom-4 left-0 w-full flex justify-center z-10">
                                    <Button className="bg-[#BFFF00] px-6 py-2 rounded-md" onClick={handlAskjoin}>
                                        {buttonText}
                                    </Button>
                                </div>
                            </div>
                        </>
                        : <>

                            <div className="bg-white p-4 rounded-lg shadow-md h-96 w-full tablet:w-[700px] laptop:w-[1100px] mx-auto mb-6 relative">
                                <h2 className="text-lg font-semibold mb-4 text-center">크루 소개</h2>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="font-semibold">크루명</div>
                                    <div>{info.crewName}</div>
                                    <div className="font-semibold">지역</div>
                                    <div>{info.activityRegion}</div>
                                    <div className="font-semibold">크루담당자</div>
                                    <div>{info.crewMaster}</div>
                                    <div className="font-semibold">인원 현황</div>
                                    <div>
                                        {info.memberCount} / {info.maxCapacity}
                                    </div>
                                </div>

                                <div className="col-span-2 mt-4">
                                    <div className="font-semibold mb-1">크루를 소개합니다</div>
                                    <p className="text-gray-700 leading-relaxed">{info.crewIntroduction}</p>
                                </div>

                                <div className="absolute bottom-4 left-0 w-full flex justify-center z-10">
                                    <Button className="bg-[#BFFF00] px-6 py-2 rounded-md" onClick={handlAskjoin} disabled={buttonText === '가입 완료' || buttonText === '가입 대기'}>
                                        {buttonText}
                                    </Button>
                                </div>
                            </div>
                        </>

                }

            </>
        </>
    );
};

export default DetailInfo;