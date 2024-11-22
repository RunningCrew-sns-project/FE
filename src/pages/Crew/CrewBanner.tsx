
import Button from "../../components/Button";
import creImg from '../../assets/mianBanner2_bg.jpg'


interface CrewInfo {
  crewImageUrls?: string;
  crewName: string;
  crewIntroduction: string;
  activityRegion: string;
  memberCount: number;
  maxCapacity: number;
}


interface CrewBannerProps {
  info: CrewInfo;  
}



const CrewBanner = ({ info } : CrewBannerProps ) => {


	return (
		<>
			<div className="relative w-full h-[180px] tablet:h-[300px] laptop:h-[300px] desktop:h-[300px] mb-20 ">
				{info ? (
					<>
							<img
								src={info.crewImageUrls  && info.crewImageUrls .length > 0 ? info.crewImageUrls[0] : creImg}
								alt={info.crewName}
								className="w-full h-full object-cover max-w-[1920px] mx-auto"
							/>
						<div className="absolute inset-0 flex flex-col items-center justify-center ">
							<h1 className=" text-white text-xl tablet:text-2xl laptop:text-3xl  desktop:text-3xl font-bold mb-2">
								{info.crewName}
							</h1>
							<p className="text-white">{info.crewIntroduction}</p>
							<div className="mt-4 flex flex-row">
								<Button theme="primary" type="button" className="mr-4 w-auto h-[24px] text-sm flex items-center justify-center">
									{info.activityRegion}
								</Button>
								<Button theme="light" type="button" className="w-auto h-[24px] text-sm flex items-center justify-center">
									크루원 : {info.memberCount} / {info.maxCapacity}
								</Button>
							</div>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default CrewBanner;
