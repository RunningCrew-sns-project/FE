import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import DetailHeader from './DetailHeader';
import { GiRunningShoe } from "react-icons/gi";
import { getcrewrunInfo, joinCrewRun } from '../../api/detail/crewrun/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import useAuthStore from '../../store/useAuthStore';
import toast from "react-hot-toast";

const JoinCrewrundetail = () => {

    let { runNumber } = useParams();
    const runId = Number(runNumber);

    const { userId } = useAuthStore()
    const { data: joincrewrundata, isLoading } = useQuery({ queryKey: ['crewrunInfo', runId], queryFn: () => getcrewrunInfo(runId) })
    const { mutate } = useMutation({
        mutationFn: joinCrewRun,
        onSuccess: (data) => {
            toast.success('크루와 함께 달리기 신청되었습니다.')
        },
        onError: (error) => {
            console.log('Error object:', error);
        },
    })

    const [isOpen, setIsOpen] = useState(false)

    const handleAskcrewrunjoin = () => {
        setIsOpen((prev) => !prev)
    }

    if (isLoading) return <div>Loading...</div>;

    if (!joincrewrundata) {
        return <div>크루달리기 정보가 없습니다.</div>;
    }

    const joincrewrun = joincrewrundata.data.responseData;

    //크루달리기에 가입하기 api
    const handleJoincrewRun = (runId: number) => {
        const parsedrunId = Number(runId);
        mutate(parsedrunId);
        setIsOpen(false)
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {!isLoading &&
                <>
                    <DetailHeader imgarray={joincrewrun.crewPostImageUrl}></DetailHeader>
                    <DetailInfo info={joincrewrun} handlAskjoin={handleAskcrewrunjoin} buttonText={userId === joincrewrundata.data.responseData.authorId ? "크루와 달리기 담당자" : "크루달리기 참여하기"} ></DetailInfo>
                </>
            }
            {
                isOpen ? <ApplicationModal
                    leftButtontext="크루와 함께 달리기에 참여할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={() => handleJoincrewRun(runId)}
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

                        <span>{joincrewrundata.crewname} 가입 안내사항을 확인해주세요</span>
                    </>
                </ApplicationModal> : ''
            }
        </>
    );
};

export default JoinCrewrundetail;