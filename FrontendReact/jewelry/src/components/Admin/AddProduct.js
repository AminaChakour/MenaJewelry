import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ReactSession } from "react-client-session";

import {storage} from "../General/firebase";
import {ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";



const AddProduct = () => {

  if (ReactSession.get("userEmail") !== "admin@gmail.com") {
    window.location.href = "/home";
  }
    const[imageList, setImageList]= useState([]);

    const [Title, setTitle] = useState('')
    //const [ProductId, setProductId] = useState('')
    const [Description, setDescription] = useState('')
    const [Price, setPrice] = useState('')
    const [Stock, setStock] = useState('')
    const [Image, setImage] = useState('')
    const [imageUpload, setImageUpload] = useState(null)
    //const imageListRef = ref(storage,  "images/")


    const uploadImage = () => {
      if(imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {

       
        getDownloadURL(snapshot.ref).then((url) => {
          setImage(url)
  
        });

      });
    };

   /* useEffect (() =>{
      listAll(imageListRef).then((response) =>{ 
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);

          });
        });
      });
    }, []);
*/
    

useEffect(()=> {
 
  if(Image.length > 0)
  axios
      .post("http://127.0.0.1:8000/product", {
        Title,
        Description,
        Price,
        Stock,
        Image,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: res.data,
          icon: "success",
          confirmButtonText: "Ok",
        });

      });


},[Image]); 

  function handleSubmit(e) {
    e.preventDefault();

    uploadImage();

      
  }

    return (
      <div className="addproductStyle">
        <form onSubmit={handleSubmit}>
          <h3>ADD PRODUCT</h3>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              maxLength={7}
              className="form-control"
              placeholder="Stock"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              multiple={false}
              className="form-control"
              placeholder="Image"
              onChange={(e) => setImageUpload( e.target.files[0] )}

    
            />
             {imageList.map((url) => {
                return <img alt = 'y' src={url} />
              })}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">
              ADD
            </button>
          </div>
        </form>
      </div>
    );

    
}

export default AddProduct;
