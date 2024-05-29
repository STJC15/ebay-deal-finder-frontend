import React from 'react'
import { auth } from '../../firebase/firebase';
import { useState } from "react";
import axios from 'axios';
import Item from '../Item/Item';
import DiscountItems from '../../Components/Discount/Discount';
import './UserItem.css'
const UserItem = ( {props} ) => {
  const payload = {};  // Empty payload
  return (
    <div className="user-items-container">
      <h1>Saved Items</h1>
        <div className='user-items'>
            {props?.map((item, i) => (
              <Item key={i}
                    id={item.itemId}
                    title={item.title}
                    image={item?.imageUrl}
                    old_price={item?.old_price ?? undefined}
                    discount_price={item?.discount_price ?? undefined}
                    new_price={item?.new_price}
                    coupons={item?.coupons}
                    discount_percent={item?.discount_percent ?? undefined}
                    shipping_cost={item?.shipping_cost ?? undefined}
                    itemUrl={item.itemUrl}
                    isSaved={true}
              />
            ))}
          </div>
    </div>
  )
}

export default UserItem