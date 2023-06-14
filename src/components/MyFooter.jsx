import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assests/logoo.png';

function MyFooter() {
  return (
    <div className="mt-auto py-3 " style={{backgroundColor:'#6aac28' , width:'100%'}}>
      <Container>
        <Row>
        <img src={logo} alt="" style={{width:'11rem' , height:'3rem'}}/>
        </Row>
        <Row className='d-flex align-items-center'>
          <Col md={6}>
            <p>Sportix &copy; {new Date().getFullYear()}</p>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <p><a  style={{color:'unset' , textDecoration:'none'}}>Privacy Policy</a> | <a  style={{color:'unset' , textDecoration:'none'}}>Terms of Service</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyFooter;