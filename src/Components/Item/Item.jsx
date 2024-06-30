import { React, useState, useEffect } from 'react';
import "./item.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Item(props) {
  // Open a new window when users click on items
  const [isClick, setIsClick] = useState(props.isSaved || false);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const routeChange = () =>{
    let path = props.itemUrl;
    window.open(path, "_blank");
  }
  const formatPrice = (price) => {
    // Check if price is explicitly 0, null, or undefined
    if (price === null || price === undefined) {
      return "Unknown";
    }
    return price;
  };
  const handleClick = () =>{
    const payload = { itemId: props.id,
                      imageUrl :props.image,
                      title: props.title,
                      itemUrl:props.itemUrl,
                      new_price: props.new_price || "Unknown",
                      old_price: props.old_price || "Unknown",
                      discount_price: props.discount_price || "Unknown",
                      shipping_cost: props.shipping_cost || "Unknown",
                      coupons: props.coupons || "Unknown",
                      discount_percent: props.discount_percent || "Unknown"};
    if(user){
      setIsClick(!isClick);
      if(!isClick){
        user.getIdToken().then((idToken) => {
          const response = axios.post('https://8ifmea1fn4.execute-api.us-east-1.amazonaws.com/prod/create_user_data',payload, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${idToken}`
            },
        }).then(response =>{
            console.log('Response:', response.data)})
        .catch(error =>{console.log('Error', error.message)});
        }).catch(error =>{console.log(error);
        })
      }
      else{
        user.getIdToken().then((idToken) => {
          console.log("id token:", idToken);
          const response = axios.delete('https://w4tp6fb2f1.execute-api.us-east-1.amazonaws.com/prod/delete_user_data', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${idToken}`
            },
            data: payload
        }).then(response =>{
            console.log('Response:', response.data)})
        .catch(error =>{console.log('Error', error.message)});
        }).catch(error =>{console.log(error);
        })
      }
    }
    else{
      navigate('/login');
    }
  }
  return (
    <div className = "item">
        <div className = "image-outer-box" onClick={routeChange}>
        <img src = {props.image} alt = "" className="image"/>
        </div>
            <div className="title-box" onClick={routeChange}><p id="title">{props.title}</p></div>
            <div className="tool-bar" onClick={handleClick}>
              <div className="star-icon">
                {isClick ? <FontAwesomeIcon icon={faSolidStar} color="#87CEEB" /> :<FontAwesomeIcon icon={faRegularStar} color="#87CEEB" />}
              </div>
            </div>
            <div className = "item-price">
                <div className = "item-new-price">
                    New Price: <span className="new-price-value">${props.new_price}</span>
                </div>
                <div className = "item-old-price">
                    List Price: {formatPrice(props.old_price) === "Unknown" ? "Unknown" :  <span className="old-price-value">${props.old_price} </span>}
                </div>
                <div className = "item-discount-price">
                    Save: <span >{formatPrice(props.discount_price) === "Unknown" ? "Unknown" : <span className="discount-value"> ${props.discount_price} ({props.discount_percent}% off) </span>}</span>
                </div>
                <div className = "item-shipping-cost">
                  Shipping: {formatPrice(props.shipping_cost) === "Unknown" ? "Unknown" : props.shipping_cost === "0.00" ? "Free Shipping" : <span className = 'shipping-cost-value'>${props.shipping_cost}</span>}
                </div>
                <div className = 'item-coupon'>
                    Coupons: {props.coupons === true ? "Available" : "Not Available"}
                </div>
            </div>
    </div>
  )
}

export default Item;