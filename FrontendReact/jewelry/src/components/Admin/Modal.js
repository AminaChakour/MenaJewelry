import React, { useEffect, useState } from "react";
import { storage } from "../General/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Modal = ({ open, onClose, onSave, prod }) => {
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [Description, setDescription] = useState("");
  const [ProductId, setProductId] = useState("");
  const [Image, setImage] = useState("");
  const [Stock, setStock] = useState("");
  const [Category, setCategory] = useState("");

  useEffect(() => {
    setDescription(prod.Description);
    setPrice(prod.Price);
    setStock(prod.Stock);
    setCategory(prod.Category);
    setTitle(prod.Title);
    setProductId(prod.ProductId);
    setImage(prod.Image);
  }, [prod]);

  useEffect(() => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  }, [imageUpload]);

  if (!open) return null;

 

  const handleSave = () => {
    onSave({
      "ProductId": ProductId,
      "Title": Title,
      "Price": Price,
      "Description": Description,
      "Stock" : Stock,
      "Category" : Category,
      "Image":Image
    });

    onClose();
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <img className="ModalImage" src={Image} />

        <div className="modalRight">
          <div className="content">
            Title
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={Title}
            />
            Price
            <input
            type= "number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={Price}
            />

            Stock
            <input
            type= "number"
              onChange={(e) => {
                setStock(e.target.value);
              }}
              value={Stock}
            />
            Description
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={Description}
            />
            <br />
            Upload new Image
            <br /> <br />
            <input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </div>
          <div className="btnContainer">
            <button onClick={handleSave} className="btnPrimary">
              <span className="bold">SAVE</span>
            </button>
            <button onClick={onClose} className="btnOutline">
              <span className="bold">CANCEL</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
