import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import DataService from './services/Service.js';

function App() {
  const [facilityList, setFacilityList] = useState([]);
  const [facilitySelected, setFacilitySelected] = useState(-1);
  const [nurseScoreList, setNurseScoreList] = useState([]);

  useEffect(() => {
    getFacilityList();
  }, []);

  const getFacilityList = async () => {
    const res = await DataService.getFacilityList();
    if (res && res.status === 200) {
      setFacilityList(res.data);
    }
  };

  const onSubmit = async () => {
    console.log(`Facility ID: ${facilitySelected}`);
    if (Number(facilitySelected) === -1) {
      console.log('Please choose a facility');
      return;
    }
    const res = await DataService.getWorkHistoryPriorityScore(facilitySelected);
    if (res && res.status === 200) {
      setNurseScoreList(res.data);
    }
  };

  const onQuery4 = async () => {
    const res = await DataService.getRemainingSpotsPerJob();
    if (res && res.status === 200) {
      console.log(res.data);
    }
  };

  const onQuery5 = async () => {
    const res = await DataService.getPossibleJobCountPerNurse();
    if (res && res.status === 200) {
      console.log(res.data);
    }
  };

  const onQuery6 = async () => {
    const res = await DataService.getMostHiredNurseListPerFacility();
    if (res && res.status === 200) {
      console.log(res.data);
    }
  };

  return (
    <Container fluid='sm' className='mt-5'>
      <Row className='justify-content-md-center'>
        <Col xs='6'>
          <Stack direction='horizontal' gap={2}>
            <Form.Select onChange={e => setFacilitySelected(e.target.value)}>
              <option value='-1'>Choose a facility ...</option>

              {facilityList &&
                facilityList.map((element, index) => {
                  return (
                    <option key={element.facility_id} value={element.facility_id}>
                      {element.facility_name}
                    </option>
                  );
                })}
            </Form.Select>
            <Button type='button' onClick={onSubmit}>
              Submit
            </Button>
          </Stack>
        </Col>
      </Row>

      <Row className='justify-content-md-center mt-4'>
        <Col xs='6'>
          <Stack direction='horizontal' gap={2} className='justify-content-md-start'>
            {nurseScoreList &&
              nurseScoreList.map((element, index) => (
                <div key={`nurse-itme-${index}`} className='nurse-item'>
                  <span>{element.nurse_id}</span>
                </div>
              ))}
          </Stack>
        </Col>
      </Row>

      <Row className='justify-content-md-center mt-4'>
        <Col xs='6'>
          <Stack direction='horizontal' gap={2}>
            <Button variant='primary' onClick={onQuery4}>
              Execute Q4 Query
            </Button>
            <Button variant='primary' onClick={onQuery5}>
              Execute Q5 Query
            </Button>
            <Button variant='primary' onClick={onQuery6}>
              Execute Q6 Query
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
