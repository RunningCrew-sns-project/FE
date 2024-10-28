import Button from '../../components/Button';
import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import DetailHeader from './DetailHeader';
import { GiRunningShoe } from "react-icons/gi";

const JoinCrewrundetail = () => {

    const joincrewrunarray = [{
        crewname: 'firstrunnncrew',
        intro: 'intro',
        image: ["https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg",
            "https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"],
        location: '서울',
        now_crew: 3,
        max_crew: 8,
        min_crew: 2,
        state: '모집중'
    }]

    const [isOpen, setIsOpen] = useState(false)

    const handleAskcrewrunjoin = () => {
        setIsOpen((prev) => !prev)
    }

    //크루에 가입하기 api
    const handleJoincrew = () => {
        console.log('가입완료')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    console.log(joincrewrunarray[0].image)

    return (
        <>
            <DetailHeader imgarray={joincrewrunarray[0].image}></DetailHeader>
            <DetailInfo infoArray={joincrewrunarray} handlAskjoin={handleAskcrewrunjoin} buttonText="크루달리기 참여하기"></DetailInfo>
            {
                isOpen ? <ApplicationModal
                    leftButtontext="크루달리기에 참여할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={handleJoincrew}
                    rightbuttonevent={handlecloseModal}
                >
                    {joincrewrunarray.map((crewrunintro) => (
                        <>
                            <div class="flex items-center justify-center">
                                <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                                <div>
                                    <div>크루명 : {joincrewrunarray.crewname}</div>
                                    <div>지역 : {joincrewrunarray.location}</div>
                                </div>
                            </div>

                            <span>{`${crewrunintro.crewname} 가입 안내사항을 확인하셨나요??`}</span>
                        </>
                    ))}
                </ApplicationModal> : ''
            }
        </>
    );
};

export default JoinCrewrundetail;