import React from 'react'
import './ShopGenSection.css'

const ShopGenSection = () => {
  return (
    <>
        <section class="collection shop-gen">
            <h2>Curated For You</h2>
            <p>Shop by Gender</p>
            <div id="inner-gen">
                <div className='gen-container'>
                    <a href="/products"><img src="/assets/images/male.jpg" alt="" /></a>
                    <h4>Gents Collection</h4>
                </div>
                <div>
                  <a href="/products"><img src="/assets/images/female.jpg" alt="" /></a>
                    <h4>Ladies Collection</h4>
                </div>
                <div>
                  <a href="/products"><img src="/assets/images/kids.jpg" alt="" /></a>
                    <h4>Kids Collection</h4>
                </div>
            </div>

        </section>
    </>
  )
}

export default ShopGenSection