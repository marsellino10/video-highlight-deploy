import React,{useEffect} from 'react';
import { VedioInput,Advantges,MyFooter,HeaderImage } from '../../components';
import { HashLink } from 'react-router-hash-link';
import {BsPatchCheckFill} from 'react-icons/bs'

import 'aos/dist/aos.css';
import AOS from 'aos';

import coverPhoto from '../../assests/design2.jpg'

import reels from '../../assests/video-reelz.mp4';


import './home.css';

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 750,
      offset: 100,
    });
  }, []);

  return (
    <div className='vedio-highlight-home'>
      {/* <header className='cover-pic' style={{
        backgroundImage: `url(${coverPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'auto',
        minHeight:'100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'100%',
        alignItems: 'center',
      }}>
        <h1 className='header-text' style={{ color: '#fff', textAlign: 'left' }}>Highlight Your football</h1>
        <h1 className='header-text' style={{ color: '#fff', textAlign: 'left' }}>Match</h1>
        <HashLink to='/#gene'><button className='header-btn' style={{ backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' }}>
          Start Now
        </button></HashLink>
        
      </header> */}
      <div style={{ width: '100%', overflow: 'hidden' }} className='headd'>
        <div className='d-flex flex-column head-text'>
        <h1 className='header-text' >Highlight Your football Match</h1>
        <div className='feat' >
            <BsPatchCheckFill style={{alignSelf:'center', marginRight:'1rem'}}/>
            <p style={{margin:'0'}}>Be updated with all football events</p>
        </div>
        <div className='feat'>
            <BsPatchCheckFill style={{alignSelf:'center', marginRight:'1rem'}}/>
            <p style={{margin:'0'}}>Save all your favorite highlights</p>
        </div>
        <div className='feat mb-8'>
            <BsPatchCheckFill style={{alignSelf:'center', marginRight:'1rem'}}/>
            <p style={{margin:'0'}}>Download any highlighted match for free</p>
        </div>
        <HashLink to='/#gene'><button className='header-btn' style={{ backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
          Get started
        </button>
        </HashLink>
        </div>
        <img
          src={coverPhoto}
          alt="Cover"
          style={{  height: 'auto' , maxHeight:'94vh'}}
          className='head-img flex-grow-0'
        />
      </div>


       {/* <HeaderImage /> */}
       {/* <Advantges /> */}
      <video src={reels} className='video' autoPlay muted loop style={{marginTop:'10rem' , width:'100%'}}
        data-aos="fade-up"> 
      </video>
      <VedioInput/>
      <MyFooter />
    </div>
  )
}

export default Home
