import React,{useEffect} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import landingpagelogo from '../assets/images/landing-page-logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch } from 'react-redux'
import { landingPage } from '../redux/actions/landingPageActions'

function LandingPage() {
  const dispatch = useDispatch()
  const setLandingPageFalseHandler = () => {
    dispatch(landingPage())
  }
  useEffect(()=>{

  },[dispatch])
  return (
    <Container className='mt-5'>
     <Row gap={4} className="mt-5 pt-5">
        <Col md={6} sm={12}>
            <Container className='display-3 mb-4'>
              Delicious And Freshly Baked Pizza
            </Container>
            <Container className='display-6'>
            You don't need to settle for cheap greasy pizza. <b>We make real pizza</b>
            </Container>
            <Container className='mt-5'>
                <LinkContainer to="/login">
                <Button variant="danger" size="lg" onClick={setLandingPageFalseHandler}>Order Now</Button>
                </LinkContainer>
            </Container>
        </Col>
        <Col md={6} sm={12}>
          <Container>
          <img src={landingpagelogo} alt="landingpage" width="100%"/>
          </Container>
        </Col>
     </Row>
    </Container>
  )
}

export default LandingPage