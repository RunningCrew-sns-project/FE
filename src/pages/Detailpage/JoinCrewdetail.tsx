import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { GiRunningShoe } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getaboutUser, getCrewInfo, joinCrew } from '../../api/detail/crew/api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'

const JoinCrewdetail = () => {

    let { crewId } = useParams();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: joinCrew,
        onSuccess: (data) => {
            console.log('data', data)
            if (data.data.success.code === 200) {
                toast.success('크루에 가입 요청되었습니다.')
                queryClient.invalidateQueries(['aboutUser', crewId]);
            }
        },
        onError: (error) => {
            console.log('error', error)
            console.log(error)
        },
    })

    const { data: crewInfo, isLoading, isError, error } = useQuery({ queryKey: ['crewInfo', crewId], queryFn: () => getCrewInfo(crewId) })
    const { data: aboutUser, isLoading: isaboutUserLoading } = useQuery({ queryKey: ['aboutUser', crewId], queryFn: () => getaboutUser(crewId) })

    const [isOpen, setIsOpen] = useState(false)
    const handlAskjoincrew = () => {
        setIsOpen((prev) => !prev)
    }

    if (!isaboutUserLoading) {
        console.log(aboutUser)
    }

    //크루에 가입하기 api
    const handleJoincrew = (crewId) => {
        const parsedCrewId = Number(crewId);
        mutate(parsedCrewId);
        setIsOpen(false)
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    let statustext = '';

    if (!isaboutUserLoading && aboutUser?.data?.success?.responseData !== undefined) {
        statustext = aboutUser.data.success.responseData.status;
        // if (!aboutUser.data.success.responseData.releaseDate && aboutUser.data.success.responseData.releaseDate <= '') {
        //     statustext = '크루 가입하기';
        // }
    }


    return (
        <>
            {!isLoading && <div>
                <DetailHeader imgarray={crewInfo.data.success.responseData.crewImageUrls}></DetailHeader>
                <DetailInfo info={crewInfo.data.success.responseData} handlAskjoin={handlAskjoincrew}
                    buttonText={aboutUser?.data?.success?.responseData === undefined
                        ? '크루 가입하기' : aboutUser.data.success.responseData.isMaster === true
                            ? '크루 담당자' : statustext}></DetailInfo>
                {isOpen ? aboutUser?.data?.success?.responseData === undefined ? <ApplicationModal
                    leftButtontext="가입할래요!"
                    rightbuttontext="취소"
                    leftButtonevent={() => handleJoincrew(crewId)}
                    rightbuttonevent={handlecloseModal}
                > <>
                        <div class="flex items-center justify-center">
                            <div className="mr-2 text-xl" ><GiRunningShoe /></div>
                            <div>
                                <div>크루명 : {crewInfo.data.success.responseData.crewName}</div>
                                <div>지역 : {crewInfo.data.success.responseData.activityRegion}</div>
                            </div>
                        </div>

                        <span>{`${crewInfo.data.success.responseData.crewName} 가입 안내사항을 확인하셨나요??`}</span>
                    </>
                </ApplicationModal> :
                    <ApplicationModal
                        rightbuttontext='닫기'
                        rightbuttonevent={handlecloseModal}
                        leftvisible={false} >
                        <span>{`현재 ${aboutUser.data.success.responseData.status} 상태로 ${aboutUser.data.success.responseData.releaseDate} 이후부터 가입가능합니다. `}</span>
                    </ApplicationModal> : ''}
            </div>}
        </>
    );
};

export default JoinCrewdetail;