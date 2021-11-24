import React, { Component } from 'react';

// import { View, Text, Image, TouchableOpacity} from 'react-native';

const ShopingNavBar = props => {
  const {
    shopeeUrl,
    lazadaUrl,
    tikiUrl
  } = props;

  console.log(shopeeUrl);
  console.log(lazadaUrl);
  console.log(tikiUrl);

  return (
    <ul className='platform-navigation'>
      <li>
        <a href={shopeeUrl} hidden={shopeeUrl ? false : true} rel='noreferrer noopener' target='_blank'>
          <span className='shopee-icon' />
        </a>
      </li>
      <li>
        <a href={lazadaUrl} hidden={lazadaUrl ? false : true} rel='noreferrer noopener' target='_blank'>
          <span className='lazada-icon' />
        </a>
      </li>
      <li>
        <a href={tikiUrl} hidden={tikiUrl ? false : true} rel='noreferrer noopener' target='_blank'>
          <span className='tiki-icon' />
        </a>
      </li>
    </ul>
  );
}

export default ShopingNavBar;


// const styles = {

//  MainContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    margin: 10
//  },
 
//  GooglePlusStyle: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    backgroundColor: '#dc4e41',
//    borderWidth: .5,
//    borderColor: '#fff',
//    height: 40,
//    borderRadius: 5 ,
//    margin: 5,

// },

// FacebookStyle: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#485a96',
//   borderWidth: .5,
//   borderColor: '#fff',
//   height: 40,
//   borderRadius: 5 ,
//   margin: 5,

// },

// ImageIconStyle: {
// //    padding: 10,
// //    margin: 5,
//    height: 80,
//    width: 80,
//    resizeMode : 'stretch',

// },

// TextStyle :{

// //   color: "#fff",
//   marginBottom : 4,
//   marginRight :20,
  
// },

// SeparatorLine :{

// backgroundColor : '#fff',
// width: 1,
// height: 40

// }

// };