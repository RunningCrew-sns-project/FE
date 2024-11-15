import Button from '../../components/Button';
import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import DetailHeader from './DetailHeader';
import { GiRunningShoe } from "react-icons/gi";
import { getcrewrunInfo } from '../../api/detail/crewrun/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const JoinCrewrundetail = () => {

    let { runId } = useParams();
    console.log('runId', runId)
    const { data: joincrewrundata, isLoading, isError, error } = useQuery({ queryKey: ['crewrunInfo', runId], queryFn: () => getcrewrunInfo(runId) })

    if (!isLoading) {
        console.log('joincrewrundata', joincrewrundata)
    }
    const [isOpen, setIsOpen] = useState(false)

    const handleAskcrewrunjoin = () => {
        setIsOpen((prev) => !prev)
    }

    //크루달리기에 가입하기 api
    const handleJoincrew = () => {
        console.log('가입완료')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {/* <DetailHeader imgarray={joincrewrundata[0].image}></DetailHeader> */}
            {!isLoading &&
                <DetailInfo info={joincrewrundata} handlAskjoin={handleAskcrewrunjoin} buttonText="크루달리기 참여하기"></DetailInfo>
            }
            {
                isOpen ? <ApplicationModal
                    leftButtontext="크루달리기에 참여할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={handleJoincrew}
                    rightbuttonevent={handlecloseModal}
                >
                    <>
                        <div class="flex items-center justify-center">
                            <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                            <div>
                                <div>크루명 : {joincrewrundata.crewname}</div>
                                <div>지역 : {joincrewrundata.location}</div>
                            </div>
                        </div>

                        <span>{`${joincrewrundata.crewname} 가입 안내사항을 확인하셨나요??`}</span>
                    </>
                </ApplicationModal> : ''
            }
        </>
    );
};

export default JoinCrewrundetail;