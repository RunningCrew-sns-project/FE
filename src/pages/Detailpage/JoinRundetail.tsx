import Button from '../../components/Button';
import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import { GiRunningShoe } from "react-icons/gi";
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getrunInfo } from '../../api/detail/general/api';

const JoinRundetail = () => {

    let { runId } = useParams();

    const { data: generalrunningdata, isLoading, isError, error } = useQuery({ queryKey: ['runInfo', runId], queryFn: () => getrunInfo(runId) })

    //to_do. 내가 참여중인 달리기 api -> 이미 참여중이면 달리기 참여 버튼 -> 참여취소로 바꾸기
    // const myJoinRunningList = myondayrunningarray.map((myondayrunning) => myondayrunning.crewname)
    // const isJoin = myJoinRunningList.includes('imjointhisrunning')

    console.log('generalrunningarray', generalrunningdata)



    const [isOpen, setIsOpen] = useState(false)
    const handlAskonedayrunning = () => {
        setIsOpen((prev) => !prev)
    }

    //todo. 런닝에 참여하는 api 
    const handleOnedayrunning = () => {
        console.log('참여완료')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className="pt-16">
                {!isLoading &&
                    <>
                        <DetailHeader imgarray={generalrunningdata.data.responseData.banners}></DetailHeader>
                        <DetailInfo info={generalrunningdata.data.responseData} handlAskjoin={handlAskonedayrunning} buttonText="일반달리기 참여하기"></DetailInfo>
                    </>
                }
                {isOpen ? <ApplicationModal
                    leftButtontext={"참여할래요!"}
                    rightbuttontext="닫기"
                    leftButtonevent={handleOnedayrunning}
                    rightbuttonevent={handlecloseModal}
                >
                    <>
                        <div class="flex items-center justify-center">
                            <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                            <div>
                                <div>달리기명 : {generalrunningdata.data.responseData.title}</div>
                                <div>지역 : {generalrunningdata.data.responseData.location}</div>
                            </div>
                        </div>
                        <div class="top-11 flex">
                            <div class="top-10"> {generalrunningdata.data.responseData.title} 달리기 참여 안내사항을 확인해주세요</div>
                        </div>
                    </>
                </ApplicationModal> : ''
                }
            </div>
        </>
    );
};

export default JoinRundetail;