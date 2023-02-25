import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ReactSession } from "react-client-session";

import { storage } from "../General/firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";   //genere des id uniques

const AddProduct = () => {
  if (ReactSession.get("userEmail") !== "admin@gmail.com") {
    window.location.href = "/home";
  }

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");
  const [Image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);  //on donne un nom a limage+ id generé
    uploadBytes(imageRef, imageUpload).then((snapshot) => {   //snapshot retourne lrl de limage et le stocke dans set image
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  };


  useEffect(() => {
    if (Image.length > 0)

      axios
        .post("http://127.0.0.1:8000/product", {
          Title,
          Description,
          Price,
          Stock,
          Image
        })
        .then((res) => {
          if(res.data ==="Added Successfully")
          {
            Swal.fire({
              title: "Success",
              text: "Added successfully",
              icon: "success",
              confirmButtonText: "Ok"
            });
          }
        
        });
  }, [Image]);

  function handleSubmit(e) {
    e.preventDefault();

    uploadImage();
  }

  return (
    <>
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
            onChange={(e) => setImageUpload(e.target.files[0])} //0 takes the first image
          />
          
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-warning">
            ADD
          </button>
        </div>
      </form>
    
    </div>
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
};

export default AddProduct;
