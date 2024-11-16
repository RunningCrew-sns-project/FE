
import todayRun from '../assets/mianBanner1_bg.jpg';
import withTogeter from '../assets/mianBanner2_bg.jpg';
import joinCrew from '../assets/mianBanner3_bg.jpg';



export type BannerData = {
  img: string;
  title: string;
};


export const BANNER_KEY: { [key: string]: BannerData } = {
  '/runlist': { img: todayRun, title: 'RUN_LIST' }, 
  '/create/run': { img: withTogeter, title: 'CREATE_RUN' },
  '/create/crew': { img: joinCrew, title: 'JOIN THE CREW' },
  '/create/crewRun:selectedCrewId': { img: todayRun, title: 'CREW_RUN' },
  '/running': { img: withTogeter, title: 'RUNNING' },
  '/chat/:id': { img: joinCrew, title: 'CHAT' },
};

