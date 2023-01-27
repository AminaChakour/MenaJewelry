import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import { CiSearch } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
const Home = () => {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/product").then((res) => {
      const data = res.data;
      var images = [];

      data.forEach((element) => {
        images.push(element.Image);
      });
      setImages(shuffle(images));

      console.log("result : ", images);
    });
  }, []);




  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
      <Carousel
        className="Carousel"
        activeIndex={index}
        onSelect={handleSelect}
     >
        <Carousel.Item interval={2000}>
          <img
            className="imgCarousel d-block w-100"
            src={Images[0]}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>K A I &nbsp; &nbsp; J E W E L R Y</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className=" imgCarousel d-block w-100"
            src={Images[1]}
            alt="Second slide"
          />

          <Carousel.Caption>
            <p>K A I &nbsp; &nbsp; J E W E L R Y</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="imgCarousel d-block w-100"
            src={Images[2]}
            alt="Third slide"
          />
          <Carousel.Caption>
            <p>K A I &nbsp; &nbsp; J E W E L R Y</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="imgCarousel d-block w-100"
            src={Images[3]}
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <p>K A I &nbsp; &nbsp; J E W E L R Y</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    );
  }

  return <ControlledCarousel />;
};

export default Home;
