import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (

  
    <MDBFooter bgColor='light' className='mt-20 text-center text-lg-start text-muted'>
    
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
       

       
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Ez Highways
              </h6>
              <p>
              We have thought of everything for your comfort: individual lighting,
            air conditioning in summer and heating in winter, footrest … Embark
            on our ultra-modern coaches, relax and arrive at your destination in
            great shape!
              </p>
            </MDBCol>


            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/signup' className='text-reset'>
                  SignUp
                </a>
              </p>
              <p>
                <a href='/login' className='text-reset'>
                  Login
                </a>
              </p>
              <p>
                <a href='/ticket' className='text-reset'>
                  My Tickets
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Canada, Montreal
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ezhighways@contact.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 1 514 222 4455
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 1 514 222 4455
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href='https://localhost:3000/home'>
          Ez Highways
        </a>
      </div>
    </MDBFooter>
  );
}