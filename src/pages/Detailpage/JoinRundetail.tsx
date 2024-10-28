import Button from '../../components/Button';
import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import { GiRunningShoe } from "react-icons/gi";
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';

const JoinRundetail = () => {
    const onedayrunningarray = [{
        crewname: 'onedayrunning!@!@',
        intro: 'intro222',
        image: ["https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg",
            "https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"],
        location: '부산',
        now_crew: 3,
        max_crew: 8,
        min_crew: 2,
        state: '모집중',
        date: '241026',
        time: "1:00",
        start: '',
        end: ''
    }]

    const myondayrunningarray = [{
        crewname: 'imjointhisrunning'
    },
    {
        crewname: 'imjointhisrunning2'
    }]

    //to_do. 내가 참여중인 달리기 api -> 이미 참여중이면 달리기 참여 버튼 -> 참여취소로 바꾸기
    const myJoinRunningList = myondayrunningarray.map((myondayrunning) => myondayrunning.crewname)
    const isJoin = myJoinRunningList.includes('imjointhisrunning')


    const [isOpen, setIsOpen] = useState(false)
    const handlAskonedayrunning = () => {
        setIsOpen((prev) => !prev)
    }

    //todo. 런닝에 참여하는 api 
    const handleOnedayrunning = () => {
        console.log('참여완료')
    }

    //todo. 런닝에 참여취소하는 api 
    const handledeleteOnedayrunning = () => {
        console.log('참여취소')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <DetailHeader imgarray={onedayrunningarray[0].image}></DetailHeader>
            <DetailInfo infoArray={onedayrunningarray} handlAskjoin={handlAskonedayrunning} buttonText="일반달리기 참여하기"></DetailInfo>
            {isOpen ? <ApplicationModal
                leftButtontext={isJoin ? "참여할래요!" : "참여 취소할래요!"}
                rightbuttontext="닫기"
                leftButtonevent={isJoin ? handleOnedayrunning : handledeleteOnedayrunning}
                rightbuttonevent={handlecloseModal}
            >
                {onedayrunningarray.map((onedayrunning) => (
                    <>
                        <div class="flex items-center justify-center">
                            <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                            <div>
                                <div>크루명 : {onedayrunning.crewname}</div>
                                <div>지역 : {onedayrunning.location}</div>
                            </div>
                        </div>
                        <div class="top-11 flex">
                            <div class="top-10">{isJoin ? `${onedayrunning.crewname} 달리기 참여 안내사항을 확인하셨나요??`
                                : `${onedayrunning.crewname} 달리기 참여를 취소하시겠습니까?`}</div>
                        </div>
                    </>
                ))}
            </ApplicationModal> : ''
            }
        </>
    );
};

export default JoinRundetail;