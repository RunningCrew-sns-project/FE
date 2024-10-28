import { useState } from 'react';
import ApplicationModal from '../../components/ApplicationModal';
import Button from '../../components/Button';

interface DetailInfoProps {
    infoArray: [];
    handlAskjoin: () => void;
    children: React.ReactNode;
    buttonText: string;
}


const DetailInfo = ({ infoArray, children, handlAskjoin, buttonText }: DetailInfoProps) => {

    return (
        <>
            {infoArray.map((crewintro) => (
                <>
                    <div className="bg-white p-4 rounded-lg shadow-md h-96 w-full tablet:w-[700px] laptop:w-[1100px] mx-auto mb-6 relative">
                        <h2 className="text-lg font-semibold mb-4 text-center">크루 소개</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div className="font-semibold">크루명</div>
                            <div>{crewintro.crewname}</div>

                            <div className="font-semibold">지역</div>
                            <div>{crewintro.location}</div>

                            <div className="font-semibold">인원 현황</div>
                            <div>
                                {crewintro.now_crew} / {crewintro.max_crew} <span className="text-gray-500">(최소인원: {crewintro.min_crew})</span>
                            </div>
                        </div>

                        <div className="col-span-2 mt-4">
                            <div className="font-semibold mb-1">크루를 소개합니다</div>
                            <p className="text-gray-700 leading-relaxed">{crewintro.intro}</p>
                        </div>

                        <div className="absolute bottom-4 left-0 w-full flex justify-center">
                            <Button className="bg-[#BFFF00] px-6 py-2 rounded-md" onClick={handlAskjoin}>
                                {buttonText}
                            </Button>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
};

export default DetailInfo;