import RunBox from "../../components/RunBox";
import { useNavigate } from "react-router-dom";
import React from 'react';

const ItemList = React.memo(({ runData }) => {
  const navigate = useNavigate();

  const handlemovedetail = (runType, runId, crewId) => {
    if (runType === "Crew") {
      navigate(`/joinCrew/${runId}`);
    } else {
      navigate(`/joinRun/${runId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-3 laptop:grid-cols-2 desktop:grid-cols-2">
      {runData.map((item) => (
        <div
          onClick={() => handlemovedetail(item.runType, item.runId, item.crewId)}
          className="w-[32%] mb-4"
          key={`${item.runId || item.crewId}-${item.runId}`}
        >
          <RunBox
            boxVerticalWidth="200px"
            boxHorizontalWidth="450px"
            title={item.title || item.crewName}
            location={item.location || item.activityRegion}
            date={item.date}
            startTime={item.startTime}
            banner={item.banner || item.crewImageUrl}
            people={item.people || item.memberCount}
            maximumPeople={item.maximumPeople || item.maxCapacity}
            status={item.status}
            runId={item.runId}
            runType={item.runType}
          />
        </div>
      ))}
    </div>
  );
});


export default ItemList