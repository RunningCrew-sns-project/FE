import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { GiRunningShoe } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getaboutUser, getCrewInfo, joinCrew, selfWithdrawlCrew } from '../../api/detail/crew/api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'

const JoinCrewdetail = () => {
    let { crewNumber } = useParams();

    const queryClient = useQueryClient();

    const crewId = Number(crewNumber);
    const { mutate } = useMutation({
        mutationFn: joinCrew,
        onSuccess: (data) => {
            if (data.data.success.code === 200) {
                toast.success('크루에 가입 요청되었습니다.')
                queryClient.invalidateQueries({ queryKey: ['aboutUser', crewId] });
            }
        },
        onError: (error) => {
            console.log('Error object:', error);
        },
    })

    const { mutate: selfWithdrawlmutate } = useMutation({
        mutationFn: selfWithdrawlCrew,
        onSuccess: (data) => {
            console.log('data', data)
            if (data.data.success.code === 200) {
                toast.success('탈퇴처리되었습니다.')
                queryClient.invalidateQueries({ queryKey: ['aboutUser', crewId] });
            }
        },
        onError: (error) => {
            console.log('Error object:', error);
        },
    })

    const { data: crewInfo, isLoading } = useQuery({ queryKey: ['crewInfo', crewId], queryFn: () => getCrewInfo(crewId) })
    const { data: aboutUser, isLoading: isaboutUserLoading } = useQuery({ queryKey: ['aboutUser', crewId], queryFn: () => getaboutUser(crewId) })

    const [isOpen, setIsOpen] = useState(false)
    const handlAskjoincrew = () => {
        setIsOpen((prev) => !prev)
    }

    if (isLoading || isaboutUserLoading) return <div>Loading...</div>;

    if (!crewInfo) {
        return <div>크루 정보가 없습니다.</div>;
    }

    if (!aboutUser) {
        return <div>내 정보가 없습니다.</div>;
    }

    const crewInfodata = crewInfo.data.success.responseData;
    const aboutUserdata = aboutUser?.data?.success?.responseData;

    //크루에 가입하기 api
    const handleJoincrew = (crewId: number) => {
        const parsedCrewId = Number(crewId);
        mutate(parsedCrewId);
        setIsOpen(false)
    }

    const handlecloseModal = () => {
        setIsOpen(false)
    }

    //크루 탈퇴 api
    const handleselfWithdrawlCrew = (crewId: number) => {
        const parsedCrewId = Number(crewId);
        selfWithdrawlmutate(parsedCrewId);
        setIsOpen(false)
    }

    let statustext = '';

    if (!isaboutUserLoading && aboutUserdata !== undefined) {
        statustext = aboutUserdata.status;
        if (aboutUserdata.releaseDay === null && statustext === '가입 완료') {
            statustext = '탈퇴 하기';
        }
        else if ((aboutUserdata.releaseDay === null && statustext !== '가입 대기') || aboutUserdata.availableToJoin === true) {
            statustext = '크루 가입하기';
        }
    }


    return (
        <>
            <div className="pt-16">
                {!isLoading && <div>
                    <DetailHeader imgarray={crewInfodata.crewImageUrls}></DetailHeader>
                    <DetailInfo info={crewInfodata} handlAskjoin={handlAskjoincrew}
                        buttonText={aboutUserdata === undefined
                            ? '크루 가입하기' : aboutUserdata.isMaster === true
                                ? '크루 담당자' : statustext}></DetailInfo>
                    {isOpen ? aboutUserdata === undefined || aboutUserdata.availableToJoin === true ? <ApplicationModal
                        leftButtontext="가입할래요!"
                        rightbuttontext="취소"
                        leftButtonevent={() => handleJoincrew(crewId)}
                        rightbuttonevent={handlecloseModal}
                    > <>
                            <div className="flex items-center justify-center mb-4">
                                <div className="mr-2 text-2xl"><GiRunningShoe /></div>
                                <div className="text-lg">
                                    <div className="font-semibold mb-1">크루명 : {crewInfodata.crewName}</div>
                                    <div className="text-gray-700">지역 : {crewInfodata.activityRegion}</div>
                                </div>
                            </div>

                            <span className="block text-center text-gray-800 font-medium mt-4">
                                {crewInfodata.crewName} 가입 안내사항을 확인해주세요
                            </span>
                        </>
                    </ApplicationModal> : statustext === '탈퇴하기' ?
                        <ApplicationModal
                            leftButtontext="탈퇴할래요!"
                            rightbuttontext="취소"
                            leftButtonevent={() => handleselfWithdrawlCrew(crewId)}
                            rightbuttonevent={handlecloseModal}
                        > <>
                                <div className="flex items-center justify-center mb-4">
                                    <div className="mr-2 text-2xl"><GiRunningShoe /></div>
                                    <div className="text-lg">
                                        <div className="font-semibold mb-1">크루명 : {crewInfodata.crewName}</div>
                                        <div className="text-gray-700">지역 : {crewInfodata.activityRegion}</div>
                                    </div>
                                </div>

                                <span className="block text-center text-gray-800 font-medium mt-4">
                                    {crewInfodata.crewName} 탈퇴하면 하루 뒤 재가입 가능합니다.
                                </span>
                            </>
                        </ApplicationModal>
                        :
                        <ApplicationModal
                            rightbuttontext='닫기'
                            rightbuttonevent={handlecloseModal}
                            leftvisible={false} >
                            <span className="block text-center text-gray-800 font-medium text-lg mt-4">
                                {`현재 ${aboutUserdata.status} 상태로 ${aboutUserdata.releaseDay} 이후부터 가입가능합니다.`}
                            </span>
                        </ApplicationModal> : ''}
                </div>}
            </div>
        </>
    );
};

export default JoinCrewdetail;