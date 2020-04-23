/*export const grade = (grade, student, course) => {

    sum = [0,0,0,0,0];

    let numberOutline = 0;
    grade &&
      grade.percent.forEach((i) => {
        if (i !== "") numberOutline += 1;
      });
    let numberStudent = student.length;
    let gradeAsStudent = [];
    for (let i = 0; i < numberStudent; i++) gradeAsStudent[i] = 0;
    let bangdiem = grade && grade.bangdiem;
    for (let i = 0; i < numberOutline; i++) {
      for (let j = 0; j < numberStudent; j++) {
        gradeAsStudent[j] +=
          bangdiem[i][j] === "" || bangdiem[i][j] === undefined
            ? 0
            : +bangdiem[i][j];
      }
    }

    let flag = false;
    let temp = 0;
    let haha = 0;
    for (let arr of bangdiem) {
      temp = 0;
      haha++;
      for (let diem of arr) {
        if (diem === "") temp++;
      }
      if (temp === numberStudent) flag = true;

      if (haha === numberOutline) break;
    }

    if (flag === true) {
      return false;
    } else {
      // console.log(gradeAsStudent, student)
    }
    return {
      gradeAsStudent,
      student,
      numberOutline,
    };
  };*/