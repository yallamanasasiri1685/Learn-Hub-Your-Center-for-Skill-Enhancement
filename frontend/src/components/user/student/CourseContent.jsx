import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Modal } from 'react-bootstrap';
import axiosInstance from '../../common/AxiosInstance';
import ReactPlayer from 'react-player';
import { UserContext } from '../../../App';
import NavBar from '../../common/NavBar';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from '@mui/material';

const CourseContent = () => {
  const { courseId, courseTitle } = useParams();
  const user = useContext(UserContext);

  const [courseContent, setCourseContent] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingSectionIndex, setPlayingSectionIndex] = useState(-1);
  const [completedSections, setCompletedSections] = useState([]);
  const [completedModule, setCompletedModule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const completedModuleIds = completedModule.map((item) => item.sectionId);

  useEffect(() => {
    getCourseContent();
  }, [courseId]);

  const getCourseContent = async () => {
    try {
      const res = await axiosInstance.get(`/api/user/coursecontent/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCourseContent(res.data.courseContent);
        setCompletedModule(res.data.completeModule);
        setCertificate(res.data.certficateData?.updatedAt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const playVideo = (videoPath, index) => {
    setCurrentVideo(videoPath);
    setPlayingSectionIndex(index);
  };

  const completeModule = async (sectionId) => {
    if (completedModule.length >= courseContent.length) {
      setShowModal(true);
      return;
    }

    if (playingSectionIndex !== -1 && !completedSections.includes(playingSectionIndex)) {
      setCompletedSections([...completedSections, playingSectionIndex]);

      try {
        const res = await axiosInstance.post(
          `/api/user/completemodule`,
          { courseId, sectionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          alert(res.data.message);
          getCourseContent();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('download-certificate.pdf');
    });
  };

  return (
    <>
      <NavBar />
      <h1 className="my-3 text-center">Welcome to the course: {courseTitle}</h1>

      <div className="course-content d-flex flex-column flex-md-row">
        <div className="course-section w-100 w-md-50 me-3">
          <Accordion defaultActiveKey="0" flush>
            {courseContent.map((section, index) => {
              const sectionId = index;
              const isSectionCompleted = completedModuleIds.includes(sectionId);

              return (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{section.S_title}</Accordion.Header>
                  <Accordion.Body>
                    <p>{section.S_description}</p>
                    {section.S_content && (
                      <>
                        <Button
                          color="success"
                          className="mx-2"
                          variant="text"
                          size="small"
                          onClick={() => playVideo(`http://localhost:8000${section.S_content.path}`, index)}
                        >
                          Play Video
                        </Button>
                        {!isSectionCompleted && !completedSections.includes(index) && (
                          <Button
                            variant="success"
                            size="small"
                            onClick={() => completeModule(sectionId)}
                            disabled={playingSectionIndex !== index}
                          >
                            Completed
                          </Button>
                        )}
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>

          {completedModule.length === courseContent.length && (
            <div className="text-center mt-3">
              <Button onClick={() => setShowModal(true)} variant="contained">
                Download Certificate
              </Button>
            </div>
          )}
        </div>

        <div className="course-video w-100 w-md-50">
          {currentVideo && (
            <ReactPlayer url={currentVideo} width="100%" height="100%" controls />
          )}
        </div>
      </div>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Completion Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congratulations! You have completed all sections.</p>
          <div id="certificate-download" className="certificate text-center p-3" style={{ border: "1px solid gray", borderRadius: "10px" }}>
            <h1>Certificate of Completion</h1>
            <p>This is to certify that</p>
            <h2>{user.userData.name}</h2>
            <p>has successfully completed the course</p>
            <h3>{courseTitle}</h3>
            <p>on</p>
            <p className="date">{new Date(certificate).toLocaleDateString()}</p>
          </div>
          <Button onClick={() => downloadPdfDocument('certificate-download')} className="mt-3 float-end">
            Download Certificate
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseContent;
