import React from 'react';
import AllCourses from '../../common/AllCourses';
import { Container } from 'react-bootstrap';

const StudentHome = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Courses</h2>
      <AllCourses />
    </Container>
  );
};

export default StudentHome;
