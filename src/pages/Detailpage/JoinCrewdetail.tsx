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
import moment from "moment";
import { useNavigate } from "react-router-dom";

const JoinCrewdetail = () => {

    let { crewId } = useParams();

    const navigate = useNavigate();
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
            console.log('Error object:', error);
        },
    })

    const { mutate: selfWithdrawlmutate } = useMutation({
        mutationFn: selfWithdrawlCrew,
        onSuccess: (data) => {
            console.log('data', data)
            if (data.data.success.code === 200) {
                toast.success('탈퇴처리되었습니다.')
                queryClient.invalidateQueries(['aboutUser', crewId]);
            }
        },
        onError: (error) => {
            console.log('Error object:', error);
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

    //크루 탈퇴 api
    const handleselfWithdrawlCrew = (crewId) => {
        const parsedCrewId = Number(crewId);
        selfWithdrawlmutate(parsedCrewId);
        setIsOpen(false)
    }

    let statustext = '';

    if (!isaboutUserLoading && aboutUser?.data?.success?.responseData !== undefined) {
        statustext = aboutUser.data.success.responseData.status;
        const currentDate = moment().format('YYYY-MM-DD');
        if (!aboutUser.data.success.responseData.releaseDay && aboutUser.data.success.responseData.releaseDay <= currentDate) {
            statustext = '크루 가입하기';
        }
        else if (statustext === '가입 완료') {
            statustext = '탈퇴하기';
        }
    }


    return (
        <>
            <div className="pt-16">
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
                            <div className="flex items-center justify-center mb-4">
                                <div className="mr-2 text-2xl"><GiRunningShoe /></div>
                                <div className="text-lg">
                                    <div className="font-semibold mb-1">크루명 : {crewInfo.data.success.responseData.crewName}</div>
                                    <div className="text-gray-700">지역 : {crewInfo.data.success.responseData.activityRegion}</div>
                                </div>
                            </div>

                            <span className="block text-center text-gray-800 font-medium mt-4">
                                {crewInfo.data.success.responseData.crewName} 가입 안내사항을 확인해주세요
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
                                        <div className="font-semibold mb-1">크루명 : {crewInfo.data.success.responseData.crewName}</div>
                                        <div className="text-gray-700">지역 : {crewInfo.data.success.responseData.activityRegion}</div>
                                    </div>
                                </div>

                                <span className="block text-center text-gray-800 font-medium mt-4">
                                    {crewInfo.data.success.responseData.crewName} 탈퇴하면 하루 뒤 재가입 가능합니다.
                                </span>
                            </>
                        </ApplicationModal>
                        :
                        <ApplicationModal
                            rightbuttontext='닫기'
                            rightbuttonevent={handlecloseModal}
                            leftvisible={false} >
                            <span className="block text-center text-gray-800 font-medium text-lg mt-4">
                                {`현재 ${aboutUser.data.success.responseData.status} 상태로 ${aboutUser.data.success.responseData.releaseDay} 이후부터 가입가능합니다.`}
                            </span>
                        </ApplicationModal> : ''}
                </div>}
            </div>
        </>
    );
};

export default JoinCrewdetail;