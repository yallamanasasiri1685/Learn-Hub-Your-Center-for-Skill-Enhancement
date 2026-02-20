import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from './AxiosInstance';
import { Button, Modal, Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const AllCourses = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [allCourses, setAllCourses] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardholdername: '',
    cardnumber: '',
    cvvcode: '',
    expmonthyear: '',
  });

  // Fetch all courses
  const getAllCoursesUser = async () => {
    try {
      const res = await axiosInstance.get(`api/user/getallcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAllCourses(res.data.data);
        setShowModal(Array(res.data.data.length).fill(false)); // Adjust modal state to course count
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  useEffect(() => {
    getAllCoursesUser();
  }, []);

  // Check if it's a paid course
  const isPaidCourse = (course) => /\d/.test(course.C_price);

  // Handle input change for card details
  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleShow = (index, price, id, title) => {
    if (price === 'free') {
      handleSubmit(id);
      return navigate(`/courseSection/${id}/${title}`);
    }
    const updated = [...showModal];
    updated[index] = true;
    setShowModal(updated);
  };

  const handleClose = (index) => {
    const updated = [...showModal];
    updated[index] = false;
    setShowModal(updated);
  };

  const handleSubmit = async (courseId) => {
    try {
      const res = await axiosInstance.post(`api/user/enrolledcourse/${courseId}`, cardDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.message);
      navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <>
      <div className="text-center mt-4">
        <p className="mt-3">Search By:</p>
        <input
          type="text"
          placeholder="Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="mx-2"
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Courses</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
        </select>
      </div>

      <div className='p-2 course-container'>
        {allCourses.length > 0 ? (
          allCourses
            .filter((course) =>
              filterTitle === '' ||
              course.C_title?.toLowerCase().includes(filterTitle.toLowerCase())
            )
            .filter((course) =>
              filterType === 'Paid' ? isPaidCourse(course)
                : filterType === 'Free' ? !isPaidCourse(course)
                  : true
            )
            .map((course, index) => (
              <div key={course._id} className='course'>
                <div className="card1">
                  <div className="desc">
                    <h3>Modules</h3>
                    {course.sections.length > 0 ? (
                      course.sections.slice(0, 2).map((sec, i) => (
                        <div key={i}>
                          <p><b>Title:</b> {sec.S_title}</p>
                          <div className="description-container">
                            <div className="description"><b>Description:</b> {sec.S_description}</div>
                          </div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p>No Modules</p>
                    )}
                    <p style={{ fontSize: 20, fontWeight: 600 }}>...and more to explore</p>
                  </div>

                  <div className="details text-center">
                    <h1>
                      {course.C_title}<br />
                      <span>{course.C_categories}</span><br />
                      <small>by: {course.C_educator}</small>
                    </h1>
                    <p>Sections: {course.sections.length}</p>
                    <p>Price: ₹{course.C_price}</p>
                    <p>Enrolled: {course.enrolled}</p>

                    {user.userLoggedIn ? (
                      <>
                        <Button
                          variant='outline-dark'
                          size='sm'
                          onClick={() => handleShow(index, course.C_price, course._id, course.C_title)}
                        >
                          Start Course
                        </Button>

                        <Modal show={showModal[index]} onHide={() => handleClose(index)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Payment for {course.C_title}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Educator: {course.C_educator}</p>
                            <p>Price: ₹{course.C_price}</p>
                            <Form onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit(course._id);
                            }}>
                              <MDBInput
                                className='mb-2'
                                label="Card Holder Name"
                                name='cardholdername'
                                value={cardDetails.cardholdername}
                                onChange={handleChange}
                                type="text"
                                placeholder="Name"
                                required
                              />
                              <MDBInput
                                className='mb-2'
                                name='cardnumber'
                                value={cardDetails.cardnumber}
                                onChange={handleChange}
                                label="Card Number"
                                type="number"
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                              <MDBRow className="mb-3">
                                <MDBCol md="6">
                                  <MDBInput
                                    name='expmonthyear'
                                    value={cardDetails.expmonthyear}
                                    onChange={handleChange}
                                    label="Expiration (MM/YYYY)"
                                    type="text"
                                    placeholder="MM/YYYY"
                                    required
                                  />
                                </MDBCol>
                                <MDBCol md="6">
                                  <MDBInput
                                    name='cvvcode'
                                    value={cardDetails.cvvcode}
                                    onChange={handleChange}
                                    label="CVV"
                                    type="number"
                                    placeholder="123"
                                    required
                                  />
                                </MDBCol>
                              </MDBRow>
                              <div className="d-flex justify-content-end">
                                <Button variant="secondary" className='mx-2' onClick={() => handleClose(index)}>Cancel</Button>
                                <Button variant="primary" type="submit">Pay Now</Button>
                              </div>
                            </Form>
                          </Modal.Body>
                        </Modal>
                      </>
                    ) : (
                      <Link to="/login">
                        <Button variant='outline-dark' size='sm'>Start Course</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className='text-center'>No courses available right now</p>
        )}
      </div>
    </>
  );
};

export default AllCourses;
