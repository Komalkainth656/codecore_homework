const methods = {};

methods["teamCount"] = function (totalTeams, students) {
  const orderedTeams = {};

  const remainMems = students.length % totalTeams;
  const memsPerTeam = Math.floor(students.length / totalTeams);

  for (let i = 0; i < totalTeams; i++) {
    orderedTeams[i.toString()] = [];
    for (let j = 0; j < memsPerTeam; j++) {
      orderedTeams[i.toString()].push(students[i * memsPerTeam + j]);
    }
  }
  for (let i = remainMems; i > 0; i--) {
    orderedTeams[i.toString()].push(students[students.length - i]);
  }
  return orderedTeams;
}



methods['numPerTeams'] = function(perTeam, students) {
  const orderedTeams = {};

  const totalTeams = Math.floor(students.length / perTeam);
  const remainMems = students.length % perTeam;

  for (let i = 0; i < totalTeams; i++) {
    orderedTeams[i.toString()] = [];
    for (let j = 0; j < perTeam; j++) {
      if (students[i * perTeam + j]) {
        orderedTeams[i.toString()].push(students[i * perTeam + j]);
      }
    }
  }
  if (remainMems > totalTeams) {
    orderedTeams[totalTeams.toString()] = [];
    for (let i = remainMems; i >= 1; i--) {
      orderedTeams[totalTeams.toString()].push(students[students.length - i])
    }
  } else {
    for (let i = remainMems; i >= 1; i--) {
      //orderedTeams[(remainMems - i - 1).toString()].push(students[students.length - i]);
      console.log(remainMems - i);
    }
  }
  return orderedTeams;
}

methods['randomize'] = function(arr) {
  const newArr = arr.slice(0);
  for (let i = 0; i < newArr.length; i++) {
    let randomIndex = Math.floor(Math.random() * i);
    let tempValue = newArr[i];

    newArr[i] = newArr[randomIndex];
    newArr[randomIndex] = tempValue;
  }
  return newArr;
}

module.exports = methods;