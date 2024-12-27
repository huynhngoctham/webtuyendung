import React from 'react';
import JobSearch from '../components/job/JobSearch';
import JobList from '../components/job/JobList';
import TopCompanies from '../components/job/TopCompanies';
import BestJobs from '../components/job/BestJobs';
import KeyIndustries from '../components/job/KeyIndustries';
// import RecommendedJobs from '../components/job/RecommendedJobs';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const featuredJobs = [
    // Job data as shown in your example
  ];

  return (
    <div className="home-page min-vh-100 bg-light">
      <JobSearch />
      <Container className="py-5">
        <Row>
          <Col lg={12}>
            <JobList jobs={featuredJobs} />
          </Col>
        </Row>
        <TopCompanies />
        <BestJobs />
        <KeyIndustries />
        {/* <RecommendedJobs /> */}
      </Container>
    </div>
  );
};

export default Home;
