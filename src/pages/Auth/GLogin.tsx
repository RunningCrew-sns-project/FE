import { useState } from "react";
import Button from "../../components/Button";
import { login } from "../../api/auth/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailOrPhoneNumber, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUserId = useAuthStore((state) => state.setUserId);
  const setLoginState = useAuthStore((state) => state.setLoginState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrPhoneNumber || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    setError(""); // 이전 에러 메시지를 초기화

    try {
      const res = await login({
        emailOrPhoneNumber,
        password,
      });

      if (res.status === 200) {
        // 토큰 저장
        localStorage.setItem(
          "auth_token",
          res.data.success.responseData.accessToken
        );
        localStorage.setItem(
          "auth_refresh_token",
          res.data.success.responseData.refreshToken
        );
        setUserId(res.data.success.responseData.userId);
        setLoginState(true);
        // 메인 페이지로 이동
        toast.success("로그인 성공!");
        navigate("/");
      } else if (res.status === 201) {
        navigate("/join");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
      console.error("로그인 처리 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          type="email"
          id="email"
          value={emailOrPhoneNumber}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="테스트계정 : RunningCrew@test.com"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="테스트 비번 : 12341234a! "
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>} {/* 에러 메시지 표시 */}
      <Button
        theme="primary"
        type="submit"
        className="w-[300px] cursor-pointer hover:opacity-70"
      >
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
