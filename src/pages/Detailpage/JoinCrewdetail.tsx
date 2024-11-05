import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { GiRunningShoe } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getCrewInfo, joinCrew } from '../../api/detail/crew/api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'

const JoinCrewdetail = () => {

    let { crewId } = useParams();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: joinCrew,
        onSuccess: (data) => {
            console.error("크루 가입 성공:", data);
        },
        onError: (error) => {
            console.error("크루 가입 실패:", error);
        },
    })

    const { data: joincrewarray, isLoading, isError, error } = useQuery({ queryKey: ['crewInfo', crewId], queryFn: () => getCrewInfo(crewId) })
    const [isOpen, setIsOpen] = useState(false)
    const handlAskjoincrew = () => {
        setIsOpen((prev) => !prev)
    }

    //크루에 가입하기 api
    const handleJoincrew = (crewId) => {
        mutate(crewId);
        toast.success('크루에 가입되었습니다')
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {!isLoading && <div>
                <DetailHeader imgarray={crewInfo.data.success.responseData.crewImageUrl}></DetailHeader>
                <DetailInfo info={crewInfo.data.success.responseData} handlAskjoin={handlAskjoincrew} buttonText="크루 가입하기"></DetailInfo>
                {isOpen ? <ApplicationModal
                    leftButtontext="가입할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={handleJoincrew}
                    rightbuttonevent={handlecloseModal}
                >
                    <>
                        <div class="flex items-center justify-center">
                            <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                            <div>
                                <div>크루명 : {crewInfo.data.success.responseData.crewName}</div>
                                <div>지역 : {crewInfo.data.success.responseData.activityRegion}</div>
                            </div>
                        </div>

                        <span>{`${crewInfo.data.success.responseData.crewName} 가입 안내사항을 확인하셨나요??`}</span>
                    </>
                </ApplicationModal> : ''}
            </div>}
        </>
    );
};

export default JoinCrewdetail;