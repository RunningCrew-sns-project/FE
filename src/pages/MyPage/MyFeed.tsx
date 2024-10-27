import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import InfiniteScroll from "../../components/InfiniteScroll";

type Props = {};

const MyFeed = (props: Props) => {
	const data = [1, 1, 1, 1, 1];
	const requestPost = () => {};
	const Post = () => {
		return (
			<div className="mb-6">
				<div className="w-full h-[400px] bg-pink-200">
					<img />
				</div>

				<div className="flex gap-2 py-4">
					<BiLike />
					<FaRegComment />
					<IoIosMore />
				</div>
				<p>
					jfkdjlsjk jakdljslf jkajdlsjfkls fjkalfjksjflskjfslkjflkjfdksjiojfois
					jsjfoisjfoiajdiosjfiosjskjfls jskjflsjflksjfk sjfskljflsjfkdjlsjk
					jakdljslf jkajdlsjfkls fjkalfjksjflskjfslkjflkjfdksjiojfois
					jsjfoisjfoiajdiosjfiosjskjfls jskjflsjflksjfk sjfskljflsjfkdjlsjk
					jakdljslf jkajdlsjfkls fjkalfjksjflskjfslkjflkjfdksjiojfois
					jsjfoisjfoiajdiosjfiosjskjfls jskjflsjflksjfk sjfskljflsjfkdjlsjk
					jakdljslf jkajdlsjfkls fjkalfjksjflskjfslkjflkjfdksjiojfois
					jsjfoisjfoiajdiosjfiosjskjfls jskjflsjflksjfk sjfskljfls
				</p>
				<div className="text-gray-500">Today 11:05 AM</div>
			</div>
		);
	};
	return (
		<div className="h-screen w-full tablet:w-[400px] laptop:w-[800px] mx-auto bg-blue-200 px-8">
			{data.map(() => {
				return <Post />;
			})}
			<InfiniteScroll isLastPage={true} fetch={requestPost} />
		</div>
	);
};

export default MyFeed;
