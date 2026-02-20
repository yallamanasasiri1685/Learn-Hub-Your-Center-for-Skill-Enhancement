import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';

import { UserContext } from '../../App';

// Common Components
import UserHome from "./UserHome";

// Student Components
import StudentHome from '../user/student/StudentHome';
import EnrolledCourses from '../user/student/EnrolledCourses';
import CourseContent from '../user/student/CourseContent';

// Teacher Components
import AddCourse from '../user/teacher/AddCourse';

// Admin Components
import AdminHome from '../admin/AdminHome';
import AllCourses from '../admin/AllCourses';

const Dashboard = () => {
  const user = useContext(UserContext);
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <UserHome />;
      case 'addcourse':
        return <AddCourse />;
      case 'enrolledcourse':
        return <EnrolledCourses />;
      case 'coursesection':
        return <CourseContent />;
      case 'courses':
        return <AllCourses />;
      case 'adminhome':
        return <AdminHome />;
      default:
        return <UserHome />;
    }
  };

  return (
    <>
      <NavBar setSelectedComponent={setSelectedComponent} />
      <Container className='my-3'>
        {renderSelectedComponent()}
      </Container>
    </>
  );
};

export default Dashboard;
