import ApplicationModal from '../../components/ApplicationModal';
import { useState } from 'react';
import { GiRunningShoe } from "react-icons/gi";
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getrunInfo, joinRun } from '../../api/detail/general/api';
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'

const JoinRundetail = () => {

    let { runId } = useParams();
    console.log('runId', runId)

    const { data: generalrunningdata, isLoading } = useQuery({ queryKey: ['runInfo', runId], queryFn: () => getrunInfo(runId) })
    const [buttonText, setbuttonText] = useState<string>('일반달리기 참여하기');

    const { mutate } = useMutation({
        mutationFn: joinRun,
        onSuccess: (data) => {
            console.log('data', data)
            toast.success('일반달리기 신청되었습니다.')
            setbuttonText('신청 완료')
        },
        onError: (error) => {
            console.log('Error object:', error);
        },
    })

    if (!isLoading) {
        console.log('generalrunningdata', generalrunningdata)
    }


    const [isOpen, setIsOpen] = useState(false)
    const handlAskonedayrunning = () => {
        setIsOpen((prev) => !prev)
    }

    //todo. 런닝에 참여하는 api 
    const handlegeneralrunning = (runId: number) => {
        const parsedrunId = Number(runId);
        mutate(parsedrunId);
        setIsOpen(false)
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
                        <DetailInfo info={generalrunningdata.data.responseData} handlAskjoin={handlAskonedayrunning} buttonText={buttonText}></DetailInfo>
                    </>
                }
                {isOpen ? <ApplicationModal
                    leftButtontext={"참여할래요!"}
                    rightbuttontext="닫기"
                    leftButtonevent={() => handlegeneralrunning(runId)}
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