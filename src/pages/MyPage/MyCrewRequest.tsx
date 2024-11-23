import { useQuery } from '@tanstack/react-query'
import { myCrewRequestUsers, approveOrRejectCrew } from '../../api/detail/crew/api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'

interface crewType {
    crewId: number;
    crewName: string;
    maxCapacity: number;
    memberCount: number;
    crewUserResponses: crewrequestUsers[];
}

interface crewrequestUsers {
    nickname: string;
    userImageUrl: string;
    profileMessage: string | null,
    gender: string;
    status: string;
    applicationDate: string;
    userId: number;
    crewId: number;
}

const MyCrewRequest = () => {
    const { data: myCrewRequstUser, isLoading } = useQuery({ queryKey: ['myCrewRequestUsers'], queryFn: myCrewRequestUsers })

    const queryClient = useQueryClient();
    const { mutate: approveCrew } = useMutation({
        mutationFn: approveOrRejectCrew,
        onSuccess: (data) => {
            if (data.data.success.code === 200) {
                toast.success('가입 승인되었습니다.')
                queryClient.invalidateQueries({ queryKey: ['myCrewRequestUsers'] });
            }
        },
        onError: () => {
            console.log('Error object:');
        },
    })

    const { mutate: rejectCrew } = useMutation({
        mutationFn: approveOrRejectCrew,
        onSuccess: (data) => {
            if (data.data.success.code === 200) {
                toast.success('가입 거절되었습니다.')
                queryClient.invalidateQueries({ queryKey: ['myCrewRequestUsers'] });
            }
        },
        onError: (error) => {
            console.log('Error object:', error);
        },
    })

    if (isLoading) return <div>Loading...</div>;

    if (!myCrewRequstUser || !myCrewRequstUser.data.success.responseData) {
        return <p className="text-white-500" >크루 가입 요청이 없습니다.</p>;
    }

    const myCrewRequstUserData = myCrewRequstUser.data.success.responseData;

    const handleApprovecrewjoin = (crewId: number, requestCrewUserId: number, approveOrReject: boolean) => {
        approveCrew({ crewId, requestCrewUserId, approveOrReject });
    }

    const handleRejectcrewjoin = (crewId: number, requestCrewUserId: number, approveOrReject: boolean) => {
        rejectCrew({ crewId, requestCrewUserId, approveOrReject });
    }

    return (
        <>
            <div className="crew-list-container">
                {myCrewRequstUserData.map((crew: crewType) => (
                    <div key={crew.crewId} className="crew-card border p-4 rounded-lg mb-4 shadow-sm text-white">
                        <h2 className="text-lg font-semibold text-white">{crew.crewName}</h2>
                        <p>최대인원: {crew.maxCapacity}</p>
                        <p>현재 인원수: {crew.memberCount}</p>

                        <div className="mt-4">
                            <h3 className="text-md font-medium">가입 요청자:</h3>
                            {crew.crewUserResponses.length > 0 ? (
                                crew.crewUserResponses.map((user) => (
                                    <div key={user.userId} className="user-request-item flex items-center justify-between p-2 border-b">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={user.userImageUrl}
                                                alt={`${user.nickname}'s profile`}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium">{user.nickname}</p>
                                                <p className="text-xs text-white-400">성별: {user.gender}</p>
                                                <p className="text-xs text-white-400">상태: {user.status}</p>
                                                <p className="text-xs text-white-400">
                                                    신청일: {new Date(user.applicationDate).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApprovecrewjoin(crew.crewId, user.userId, true)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                            >
                                                승인
                                            </button>
                                            <button
                                                onClick={() => handleRejectcrewjoin(crew.crewId, user.userId, false)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                            >
                                                거절
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-black-500">현재 가입 요청자가 없습니다.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyCrewRequest;
