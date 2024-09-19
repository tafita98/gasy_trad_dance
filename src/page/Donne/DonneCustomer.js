import React from 'react'
import { Link } from 'react-router-dom';
import media from "../../Saved Pictures/media.jpg";
function microCustomer() {
  return (
    <div>
           {/* <!-- micro List --> */}
        <div class="micro-list">
          <Link to={"#"} class="micro-card">
            <div class="thumbnail-container">
              <img src={media} alt="micro Thumbnail" class="thumbnail"/>
              <p class="duration">10:03</p>
            </div>
            <div class="micro-info">
              <img src={media} alt="Channel Logo" class="icon" />
              <div class="micro-details">
                <h2 class="title">Top 10 Easy To Create JavaScript Games For Beginners</h2>
                <p class="channel-name">CodingNepal</p>
                <p class="views">27K Views • 4 months ago</p>
              </div>
            </div>
          </Link>
          <Link to={"#"} class="micro-card">
            <div class="thumbnail-container">
              <img src={media} alt="micro Thumbnail" class="thumbnail" />
              <p class="duration">23:45</p>
            </div>
            <div class="micro-info">
              <img src={media} alt="Channel Logo" class="icon" />
              <div class="micro-details">
                <h2 class="title">How to make Responsive Card Slider in HTML CSS & JavaScript</h2>
                <p class="channel-name">CodingLab</p>
                <p class="views">42K Views • 1 year ago</p>
              </div>
            </div>
          </Link>
          <Link to={"#"} class="micro-card">
            <div class="thumbnail-container">
              <img src={media} alt="micro Thumbnail" class="thumbnail" />
              <p class="duration">29:43</p>
            </div>
            <div class="micro-info">
              <img src={media} alt="Channel Logo" class="icon" />
              <div class="micro-details">
                <h2 class="title">Create A Responsive Website with Login & Registration Form in HTML CSS and JavaScript</h2>
                <p class="channel-name">CodingNepal</p>
                <p class="views">68K Views • 9 months ago</p>
              </div>
            </div>
          </Link>
         
         
         
        
          
        
          
        
         
         
        </div>
    </div>
  )
}

export default microCustomer
