import Button from '../../components/Button';
import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { GiRunningShoe } from "react-icons/gi";
import { useParams } from 'react-router-dom';

const JoinCrewdetail = () => {

    let { runId } = useParams();

    //runId에 해당하는 detail api 가져오기 
    const joincrewarray = [{
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
    const handlAskjoincrew = () => {
        setIsOpen((prev) => !prev)
    }

    //크루에 가입하기 api
    const handleJoincrew = () => {
        console.log('가입완료')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div>
                <DetailHeader imgarray={joincrewarray[0].image}></DetailHeader>
                <DetailInfo infoArray={joincrewarray} handlAskjoin={handlAskjoincrew} buttonText="크루 가입하기"></DetailInfo>
                {isOpen ? <ApplicationModal
                    leftButtontext="가입할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={handleJoincrew}
                    rightbuttonevent={handlecloseModal}
                >
                    {joincrewarray.map((crewintro) => (
                        <>
                            <div class="flex items-center justify-center">
                                <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                                <div>
                                    <div>크루명 : {joincrewarray.crewname}</div>
                                    <div>지역 : {joincrewarray.location}</div>
                                </div>
                            </div>

                            <span>{`${crewintro.crewname} 가입 안내사항을 확인하셨나요??`}</span>
                        </>
                    ))}
                </ApplicationModal> : ''}
            </div>
        </>
    );
};

export default JoinCrewdetail;