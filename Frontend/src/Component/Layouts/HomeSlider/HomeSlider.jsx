import React from 'react'
import { UncontrolledCarousel}from 'reactstrap';
import homesliderimage1 from '../../../assets/Images/homesliderimage1.jpg';
import homesliderimage2 from '../../../assets/Images/homesliderimage2.jpg';
import homesliderimage3 from '../../../assets/Images/homesliderimage3.jpg';
import homesliderimage4 from '../../../assets/Images/homesliderimage4.jpg';

function HomeSlider() {
  return (
    <div><UncontrolledCarousel
    items={[
      {
        altText: 'Making Voting Accessible for All',
        caption: 'FOR EVERYONE',
        key: 1,
        src:homesliderimage1
        
      },
      {
        altText: 'Vote from Anywhere, Anytime',
        caption: 'FROM ANYWHERE',
        key: 2,
        src:homesliderimage2
        
      },
      {
        altText: 'DEMOCRACY IN YOUR HAND',
        caption: 'ANY TIME',
        key: 3,
        src:homesliderimage3

      }
      ,
      {
        altText: 'FOR RIGHT TO VOTE',
        caption: 'FOR  OUR RIGHTS',
        key: 4,
        src:homesliderimage4

      }
    ]}
    /></div>
  )
}

export default HomeSlider