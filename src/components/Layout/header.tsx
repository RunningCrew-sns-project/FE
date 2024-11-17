import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORYS } from "../../const/category";
import Button from "../Button";
import { ResponsiveContainer } from "../Container";
import { FaRegBell } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();

	const { isLoggedIn, logout } = useAuthStore();

	const handleMovePage = (keyword: string) => {
		navigate("runlist");
		setSearchParams({ category: keyword });
		if (keyword === "/crew") {
			navigate("/crew");
		}
	};

	const handleLogout = () => {
		logout();
		toast("로그아웃되었습니다.");
	};

	return (
		<>
			<div className=" h-[60px] bg-primary z-[2000] pt-2.5 shadow-lg">
				<ResponsiveContainer>
					<div className="flex justify-between items-center h-full">
						<Link to={"/"}>
							<h1 className="cursor-pointer">로고</h1>
						</Link>
						<div>
							<ul className="flex space-x-4 items-center  ">
								{CATEGORYS.map((category) => (
									<li
										className="cursor-pointer font-black"
										onClick={() => handleMovePage(category.keyword)}
									>
										{category.value}
									</li>
								))}
							</ul>
						</div>
						<div>
							{isLoggedIn ? (
								<Button type="button" theme="light" onClick={handleLogout}>
									로그아웃
								</Button>
							) : (
								<Link to={"/login"}>
									<Button type="button" theme="light">
										로그인
									</Button>
								</Link>
							)}
						</div>
						<div className="flex gap-2 items-center">
							<FaRegBell />
							<MdOutlinePersonOutline
								size={20}
								className="cursor-pointer"
								onClick={() => navigate("/myPage")}
							/>
						</div>
					</div>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default Header;
