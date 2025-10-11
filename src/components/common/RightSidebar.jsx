import React from 'react';
import TrendingAndScore from './sidebar/TrendingAndScore';
import VideosSection from './sidebar/VideosSection';
import HoroscopeSection from './sidebar/HoroscopeSection';
import TopHeadlinesSection from './sidebar/TopHeadlinesSection';
import PollSection from './sidebar/PollSection';
import Multitranding from './sidebar/Multitranding';

const RightSidebar = () => {
    return (
        <div>
            {/* Saare components ko yahan assemble karein */}
            <TrendingAndScore />
            <PollSection /> 
            <VideosSection /> 
            <TopHeadlinesSection /> 
            < HoroscopeSection/>
            <div style={{ backgroundColor: 'black', height: '250px', width: '100%' }} className="my-4">
            {/* Advertisement Placeholder */}
            </div>
               <Multitranding /> 
        </div>
    );
};

export default RightSidebar;