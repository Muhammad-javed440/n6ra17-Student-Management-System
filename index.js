import inquirer from 'inquirer';
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt([
        {
            name: "ans",
            type: 'list',
            message: 'Please select an option : \n',
            choices: ['Enroll a student', 'Show student status']
        }
    ]);
    if (action.ans === 'Enroll a student') {
        let studentName = await inquirer.prompt([
            {
                name: 'answer',
                type: 'input',
                message: 'Please enter your name'
            }
        ]);
        let trimmedStudentName = (studentName.answer).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log('\n\t Your account has been created');
                console.log(`Welcome, ${trimmedStudentName} !`);
                let course = await inquirer.prompt([
                    {
                        name: 'ans',
                        type: 'list',
                        message: 'Please select a course ',
                        choices: ["IT", "English", "Cooking"]
                    }
                ]);
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 3000;
                        break;
                    case "Cooking":
                        courseFees = 2000;
                        break;
                }
                let courseConfirm = await inquirer.prompt([
                    {
                        name: 'ans',
                        type: 'confirm',
                        message: 'Do you want to enroll in this course'
                    }
                ]);
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log('You have enrolled in this course');
                }
            }
            else {
                console.log('Invalid name');
            }
        }
        else {
            console.log('This name is already exists');
        }
    }
    else if (action.ans === 'Show student status') {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt([
                {
                    name: 'ans',
                    type: 'list',
                    message: 'Please select a name',
                    choices: studentNameCheck
                }
            ]);
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log('Student information');
            console.log(foundStudent);
            console.log("\n ");
        }
        else {
            console.log('Record is empty');
        }
    }
    let userConfirm = await inquirer.prompt([
        {
            name: 'ans',
            type: 'confirm',
            message: 'Do you want to continue ?'
        }
    ]);
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
