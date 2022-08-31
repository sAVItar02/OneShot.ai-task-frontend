import React, { useState, useEffect } from "react";
import "./CollegeComponent.css";

const College = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [collegeDetails, setCollegeDetails] = useState([]);
  const [similarColleges, setSimilarColleges] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);

  const [showColleges, setShowColleges] = useState(true);
  const [showCollegeDetails, setShowCollegeDetails] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  const url = `https://oneshotai-task.herokuapp.com/api/v1/colleges/`;

  const getCollegeData = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCollegeData(result.data.colleges);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeData();
  }, []);

  const getCollegeStudentsData = async (props) => {
    fetch(
      `https://oneshotai-task.herokuapp.com/api/v1/students/all/${props.id}`
    )
      .then((response) => response.json())
      .then((result) => {
        setCollegeDetails(result.data.students);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSimilarColleges = async (props) => {
    fetch(
      `https://oneshotai-task.herokuapp.com/api/v1/colleges/similar?no_of_students=${props.no_of_students}&state=${props.state}&city=${props.city}`
    )
      .then((response) => response.json())
      .then((result) => {
        setSimilarColleges(result.data.colleges);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudentData = async (props) => {
    fetch(`https://oneshotai-task.herokuapp.com/api/v1/students/${props.id}`)
      .then((response) => response.json())
      .then((result) => {
        setStudentDetails(result.data.student);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCollegeClick = (props) => {
    setShowColleges(false);
    setShowCollegeDetails(true);
    setShowStudentDetails(false);

    getCollegeStudentsData(props);
    getSimilarColleges(props);
  };

  const handleStudentClick = (props) => {
    setShowColleges(false);
    setShowCollegeDetails(false);
    setShowStudentDetails(true);

    getStudentData(props);
  };

  const handleBack = (props) => {
    if (props == "college") {
      setShowColleges(true);
      setShowCollegeDetails(false);
      setShowStudentDetails(false);
    } else if (props == "student") {
      setShowColleges(false);
      setShowCollegeDetails(true);
      setShowStudentDetails(false);
    }
  };

  if (showColleges) {
    return (
      <>
        <section className="collegeSection" id="colleges">
          <div className="main-head">
            <h3 className="head">Id</h3>
            <h3 className="head">College</h3>
            <h3 className="head">City</h3>
            <h3 className="head">State</h3>
            <h3 className="head">Students</h3>
          </div>
          <div className="colleges">
            {collegeData.map((item) => {
              return (
                <div
                  className="college"
                  key={item.id}
                  onClick={() =>
                    handleCollegeClick({
                      id: item.id,
                      _id: item._id,
                      state: item.state,
                      no_of_students: item.no_of_students,
                    })
                  }
                >
                  <div className="college-field">{item.id}</div>
                  <div className="college-field">{item.name}</div>
                  <div className="college-field">{item.city}</div>
                  <div className="college-field">{item.state}</div>
                  <div className="college-field">{item.no_of_students}</div>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  if (showCollegeDetails) {
    return (
      <>
        <section className="similar">
          <div className="similar-header">
            <h2 className="similar-heading">Similar Colleges</h2>
            <button
              className="back-button"
              onClick={() => handleBack("college")}
            >
              Back
            </button>
          </div>
          <div className="main-head">
            <h3 className="head">Id</h3>
            <h3 className="head">College</h3>
            <h3 className="head">City</h3>
            <h3 className="head">State</h3>
            <h3 className="head">Students</h3>
          </div>
          <div className="similar-main">
            <div className="colleges">
              {similarColleges.map((item) => {
                return (
                  <div
                    className="college"
                    key={item.id}
                    onClick={() =>
                      handleCollegeClick({
                        id: item.id,
                        _id: item._id,
                        state: item.state,
                        no_of_students: item.no_of_students,
                      })
                    }
                  >
                    <div className="college-field">{item.id}</div>
                    <div className="college-field">{item.name}</div>
                    <div className="college-field">{item.city}</div>
                    <div className="college-field">{item.state}</div>
                    <div className="college-field">{item.no_of_students}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="studentsSection">
          <h2 className="similar-heading">Students</h2>
          <div className="main-head">
            <h3 className="head">Id</h3>
            <h3 className="head">Name</h3>
            <h3 className="head">College</h3>
            <h3 className="head">Year</h3>
            <h3 className="head">Skills</h3>
          </div>

          <div className="students">
            {collegeDetails.map((item) => {
              return (
                <div
                  className="student"
                  key={item.id}
                  onClick={() => handleStudentClick({ id: item._id })}
                >
                  <div className="college-field">{item.id}</div>
                  <div className="college-field">{item.name}</div>
                  <div className="college-field">{item.college_id}</div>
                  <div className="college-field">{item.year_of_batch}</div>
                  <div className="college-field">{item.skills[0]}</div>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  if (showStudentDetails) {
    return (
      <>
        <section className="studentSection">
          <div className="similar-header">
            <h2 className="similar-heading">Student Details</h2>
            <button
              className="back-button"
              onClick={() => handleBack("student")}
            >
              Back
            </button>
          </div>
          <div className="student-info">
            <div className="student-head">Name</div>
            <div>{studentDetails.name}</div>
          </div>
          <div className="student-info">
            <div className="student-head">ID</div>
            <div>{studentDetails.id}</div>
          </div>
          <div className="student-info">
            <div className="student-head">College ID</div>
            <div>{studentDetails.college_id}</div>
          </div>
          <div className="student-info">
            <div className="student-head">Year</div>
            <div>{studentDetails.year_of_batch}</div>
          </div>
          <div className="student-info">
            <div className="student-head">Skills</div>
            <div>
              {studentDetails.skills.map((item) => {
                return <span className="skill">{item}</span>;
              })}
            </div>
          </div>
        </section>
        ;
      </>
    );
  }
};

export default College;
