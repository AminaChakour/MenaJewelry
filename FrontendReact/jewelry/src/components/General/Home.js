import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import { CiSearch } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import ReactLoading from "react-loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [Images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/product").then((res) => {
      const data = res.data;
      var images = [];

      data.forEach((element) => {
        images.push(element.Image);
      });

      setImages(shuffle(images));

      setLoading(false);
    });
  }, []);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const redirect = (cat) => {
    ReactSession.set("Category", cat);

    window.location.href = "/products";
  };


  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    

    //spinningBubbles cylon cubes spin bubbles
    return (
      <>
        {loading ? (
          <div className="loader">
            <ReactLoading
              className="loader"
              type="cylon"
              color="#B0B290"
              height={667}
              width={400}
            />
          </div>
        ) : (
          <>
            <img className="imghome" src="home.png" />
            <div className="hometext">
              <p>
                PEARLS, BEADS AND GOLD TO SWOON OVER.
                <br />
                FINE JEWELRY AND TIMELESS DAINTY THINGS.
              </p>

              <button
                onClick={() => {
                  redirect("ALL PRODUCTS");
                }}
           
                className="btnShopNow"
              >
            
                SHOP NOW
              </button>
            </div>
            <div className="row">
              <Carousel
                className="Carousel col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
                activeIndex={index}
                onSelect={handleSelect}
                //fade
              >
                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[0]}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <p>M E N A</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className=" imgCarousel d-block w-100"
                    src={Images[1]}
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <p>M E N A</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[2]}
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <p>M E N A</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[3]}
                    alt="Fourth slide"
                  />
                  <Carousel.Caption>
                    <p>M E N A</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

              <Carousel
                className="Carousel col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
                activeIndex={index}
                onSelect={handleSelect}
                //fade
              >
                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[1]}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <p>J E W E L R Y</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className=" imgCarousel d-block w-100"
                    src={Images[2]}
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <p>J E W E L R Y</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[3]}
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <p>J E W E L R Y</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="imgCarousel d-block w-100"
                    src={Images[0]}
                    alt="Fourth slide"
                  />
                  <Carousel.Caption>
                    <p>J E W E L R Y</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>

            <div className="hometext">
              <p>
                <strong>MORE THAN JEWELRY, UNLEASH YOUR FEMININITY.</strong>
              </p>
              <button
                onClick={() => {
                  redirect("ALL PRODUCTS");
                }}
           
                className="btnShopNow"
              >
            
                SHOP NOW
              </button>
          
            </div>
            <br/>
            <br/>
            <br/>
            <br/> 
            <div className="row category">
           
                
                <img  onClick={() => {
                  redirect("Earrings");
                }} className="HomeCatImg col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4" src="earr1.jpg" alt="Earrings" />
             
          
          
                 
                <img onClick={() => {
                  redirect("Rings");
                }} className="HomeCatImg col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4" src="h1.png" alt="Rings" />
               
           

           
               
                <img  onClick={() => {
                  redirect("Necklaces");
                }} className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 HomeCatImg" src="n1.png" alt="Necklaces" />
                
           
            </div>
          </>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }

  return <ControlledCarousel />;
};

export default Home;
