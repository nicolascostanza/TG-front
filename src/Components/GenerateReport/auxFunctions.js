export const filterByDate = (data, { init = '', end = '' }) => {
  const initDate = init !== '' ? new Date(init) : new Date('2000-01-01');
  const endDate = end !== '' ? new Date(end) : new Date('2100-01-01');
  const filteredData = data.filter((item) => {
    return new Date(item.date) >= initDate && new Date(item.date) <= endDate;
  });

  return filteredData;
};

// Day by day contributions
export const projectDataFormatter = (
  data,
  project,
  { fillZero = false, accumulate = false, rated = false, initialDate = '', finalDate = '' }
) => {
  const initDate = new Date(initialDate) > new Date(data[0]?.date) ? initialDate : data[0].date;
  const initDateNum = Number(new Date(initDate));
  const endDate = finalDate !== '' ? finalDate : data[data.length - 1].date;
  const dayDiff = (new Date(endDate) - new Date(initDate)) / constants.MILIS_PER_DAY;
  const team = project?.team.map((member) => {
    return {
      ...member.employeeId,
      rate: member.rate
    };
  });
  let dayList = [];

  // First a list of the days between start and end
  for (let i = 0; i <= dayDiff; i++) {
    const dateToAppend = new Date(constants.MILIS_PER_DAY * i + initDateNum)
      .toISOString()
      .split('T')[0];
    dayList.push(dateToAppend);
  }

  // Then we map each contribution
  const transposedEmpContr = dayList
    .map((day) => {
      return {
        date: day,
        contr: data.filter((dataItem) => dataItem.date === day)
      };
    })
    .map((item) => {
      return team.map((teamItem) => {
        const hours = item.contr
          .filter((contrItem) => {
            return teamItem._id === contrItem._id;
          })
          .map((hour) => hour.hours)
          .reduce((prev, curr) => prev + curr, 0);
        let hoursCount = hours;
        if (rated) {
          hoursCount *= teamItem.rate;
        }
        if (fillZero) {
          return hoursCount;
        } else {
          return hoursCount > 0 ? hoursCount : null;
        }
      });
    });

  let empContr = [];
  for (let i = 0; i < team.length; i++) {
    let auxArr = [];
    transposedEmpContr.map((item) => {
      if (accumulate && auxArr.length > 0) {
        item[i] += auxArr[auxArr.length - 1];
      }
      auxArr.push(item[i]);
    });
    empContr.push(auxArr);
  }

  // Last but not least, Join everything
  return {
    label: dayList,
    teamLabel: team.map((item) => item.firstName),
    data: empContr
  };
};

export const constants = {
  MILIS_PER_DAY: 86400000
};
