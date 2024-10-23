
import todayRun from '../assets/mianBanner1_bg.jpg';
import withTogeter from '../assets/mianBanner2_bg.jpg';
import joinCrew from '../assets/mianBanner3_bg.jpg';



export type BannerData = {
  img: string;
  title: string;
};


export const BANNER_KEY: { [key: string]: BannerData } = {
  '/runlist': { img: todayRun, title: 'RUN_LIST' }, 
  '/createrun': { img: withTogeter, title: 'CREATE_RUN' },
  '/createcrew': { img: joinCrew, title: 'JOIN THE CREW' },
  '/crewrun': { img: todayRun, title: 'CREW_RUN' },
  '/running': { img: withTogeter, title: 'RUNNING' },
  '/chat': { img: joinCrew, title: 'CHAT' },
};