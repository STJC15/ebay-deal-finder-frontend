import React from 'react';
import "./item.css";
function Item(props) {
  // Open a new window when users click on items
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

  return (
    <div className = "item" onClick={routeChange}>
        <div className = "image-outer-box">
        <img src = {props.image} alt = "" className="image"/>
        </div>
            <div className="title-box"><p id="title">{props.name}</p></div>
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