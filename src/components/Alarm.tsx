import { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const Alarm = () => {
    const [realtimeData, setRealtimeData] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [notification, setNotification] = useState<string>("");

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = useRef<null | EventSource>(null);
    const auth_token = localStorage.getItem("auth_token");
    useEffect(() => {
        const fetchSSE = () => {
            eventSource.current = new EventSource(
                `http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/notifications/connect`,
                {
                    headers: {
                        Authorization: "Bearer" + " " + auth_token,
                        // Connection: 'keep-alive',
                    },
                    // heartbeatTimeout: 6000000,
                    withCredentials: true,
                }
            );

            //notification : 서버에서 설정한 emitter name
            eventSource.current.addEventListener("notification", (e: MessageEvent) => {
                // 데이터가 들어오면 팝업 표시
                console.log('event왔다', e)
                setNotification(e.data);
                setRealtimeData(true);
                setShowPopup(true);
            });

            eventSource.current.onerror = async () => {
                // 연결이 끊어지면 재연결 시도
                // setTimeout(fetchSSE, 3000);
                eventSource.current?.close();
            };

            eventSource.current.onopen = () => {
                // 연결이 정상적으로 되면 콘솔 로그
                console.log("SSE 연결됨");
            };
        };

        fetchSSE();

        return () => {
            eventSource.current?.close();
        };
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {realtimeData && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded" />
            )}

            {showPopup && (
                <div
                    className="fixed bottom-10 right-10 bg-white border p-4 rounded shadow-lg"
                    style={{ zIndex: 999 }}
                >
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">새로운 알림!</span>
                        <button
                            onClick={handleClosePopup}
                            className="text-red-500 hover:text-red-700"
                        >
                            X
                        </button>
                    </div>
                    <div className="mt-2">{notification}</div>
                </div>
            )}
        </div>
    );
};

export default Alarm;
