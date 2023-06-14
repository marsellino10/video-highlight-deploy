import React,{useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'aos/dist/aos.css';
import AOS from 'aos';


import saveTime from '../../assests/saveTime.jpg';
import downloadAndSave from '../../assests/saveAndDown.jpg';
import missMatch from '../../assests/nooMiss.jpg'

import './adv.css';

const Advantges = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 250,
    });
  }, []);


  return (
    <div className='vedio-highlight-adv' data-aos="fade-up" style={{padding:'4rem 2rem'}}>
        <h1 style={{textAlign:'center',fontSize:'3rem'}} className='mb-5 '
        data-aos='fade-down'>
          Why use video Highlight ?
        </h1>
        <Row xs={1} md={2} lg={3} className="g-4" data-aos="fade-up-left" style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
        <Col  style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right" style={{borderRadius:'0.5rem'}}>
            <Card.Img variant="top" src={saveTime} />
            <Card.Body >
              <Card.Title style={{color:'white'}}>Save Time</Card.Title>
              <Card.Text style={{color:'white'}}>
                Save your time, now you can watch the highlighted video not all the match.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right">
            <Card.Img variant="top" src={missMatch} />
            <Card.Body>
              <Card.Title style={{color:'white'}}>Don't miss any match</Card.Title>
              <Card.Text style={{color:'white'}}>
                If you missed the match you can whatch your own highlighted video.  
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right">
            <Card.Img variant="top" src={downloadAndSave} />
            <Card.Body>
              <Card.Title style={{color:'white'}}>Download and Save</Card.Title>
              <Card.Text style={{color:'white'}}>
                You can download and save all your highlighted videos in your profile. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      
    </div>
  )
}

export default Advantges;
