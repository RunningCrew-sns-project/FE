import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import InfiniteScroll from "../../components/InfiniteScroll";
import { deleteMyFeed, getMyFeed } from "../../api/myPage/api";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	centerMode: true,
	centerPadding: "0",
};

interface FeedData {
	blogId: number | string;
	content: string;
	createdAt: string;
	distance: string;
	imageUrl: [];
	likeCount: number;
	liked: boolean;
	record: string;
	title: string;
	userId: number;
	userImg: string;
	userName: string;
}

const MyFeed = () => {
	const [feedData, setFeedData] = useState([]);
	const navigate = useNavigate();

	const requestPost = async () => {
		const res = await getMyFeed();
		console.log("res", res);
		if (res.status === 200) {
			setFeedData(res.data.success.responseData.currentScrollItems);
		}
	};

	const deletePost = (id: number | string) => {
		deleteMyFeed(id);
		setFeedData((prev) => prev.filter((feed: any) => feed.blogId !== id));
	};

	const handlemoveEditblog = (blogId: number | string) => {
		const selectedFeed = feedData.find(
			(feed: FeedData) => feed.blogId === blogId,
		);
		if (selectedFeed) {
			navigate(`/editBlog/${blogId}`, { state: { feedData: selectedFeed } });
		}
	};

	useEffect(() => {
		requestPost();
	}, []);

	const Post = ({ data }: { data: FeedData }) => {
		return (
			<div className="bg-white rounded-lg p-6">
				<div className="flex justify-between items-center mb-2">
					<h1 className="font-bold text-xl">{data.title}</h1>
					<RiDeleteBin5Line
						size={20}
						className="cursor-pointer"
						onClick={() => deletePost(data.blogId)}
					/>
				</div>

				<Slider
					{...settings}
					className="w-[400px] h-[400px] bg-gray-400 overflow-hidden"
				>
					{data.imageUrl.map((image: string) => (
						<img src={image} className="object-cover w-full h-full" />
					))}
				</Slider>

				<div className="flex gap-2 py-4 items-center">
					<div className="flex items-center">
						<BiLike />
						<span className="">
							{data.likeCount === 0 ? "" : data.likeCount}
						</span>
					</div>
					<FaRegComment />
					<FaRegEdit
						onClick={() => handlemoveEditblog(data.blogId)}
						className="cursor-pointer"
					/>
					{/* <IoIosMore /> */}
				</div>
				<p>{data.content}</p>
				<div className="text-gray-500">{data.createdAt}</div>
			</div>
		);
	};
	return (
		<div className="h-full w-full tablet:w-[400px] laptop:w-[800px] mx-auto px-8 flex flex-col items-center gap-4 bg-black">
			{feedData.map((myFeed) => {
				console.log(myFeed, "myFeed");
				return <Post data={myFeed} />;
			})}
			<InfiniteScroll isLastPage={true} fetch={requestPost} />
		</div>
	);
};

export default MyFeed;
