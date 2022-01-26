import ContentBox from '@src/components/Molecules/ContentBox';
import PlannerBox from '@src/components/Molecules/Planner/PlannerBox';
import PlannerDate from '@src/components/Molecules/Planner/PlannerDate';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const todayPlanners = [
  {
    title: '두잇커밋 회의',
    participants: ['전예진,윤창민'],
  },
  {
    title: '두잇커밋 회의',
    participants: ['전예진,윤창민'],
  },
];

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateList = useMemo(
    () => [
      selectedDate.getDate() - 2,
      selectedDate.getDate() - 1,
      selectedDate.getDate(),
      selectedDate.getDate() + 1,
      selectedDate.getDate() + 2,
    ],
    [selectedDate],
  );

  return (
    <ContentBox title="두잇 플래너" contentWidth={400} requiredHeader>
      <PlannerWrapper>
        <Dates>
          {dateList.map((day, idx) => (
            <PlannerDate
              onChangeDate={() => {}}
              year={selectedDate.getFullYear()}
              month={selectedDate.getMonth()}
              key={idx}
              day={day}
              selected={selectedDate.getDate()}
            />
          ))}
        </Dates>
        <Planners>
          {todayPlanners.map((planner, idx) => (
            <PlannerBox participants={planner.participants} title={planner.title} key={idx} />
          ))}
        </Planners>
      </PlannerWrapper>
    </ContentBox>
  );
};

const PlannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Dates = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0px;
  align-items: center;
  justify-content: space-around;
`;

const Planners = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export default Planner;
