import logo from './logo.svg';
import { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';

const candleData = [
  { name: "Candy Apple", id: 0, image: "candleImages/candyApple.jpg", season: "Winter", size: "Medium", price: 10.99 },
  { name: "Pumpkin Spice", id: 1, image: "candleImages/pumpkinSpice.jpg", season: "Fall", size: "Small", price: 2.99 },
  { name: "Wildflower Fields", id: 2, image: "candleImages/wildflowerFields.jpg", season: "Spring", size: "Medium", price: 12.99 },
  { name: "Spring Showers", id: 3, image: "candleImages/springShowers.png", season: "Spring", size: "Large", price: 16.99 },
  { name: "Ocean Breeze", id: 4, image: "candleImages/oceanBreeze.jpg", season: "Summer", size: "Large", price: 15.99 },
  { name: "Winterberry", id: 5, image: "candleImages/winterberry.jpg", season: "Winter", size: "Small", price: 5.99 },
  { name: "Lemon Verbena", id: 6, image: "candleImages/lemonVerbena.jpg", season: "Summer", size: "Small", price: 4.99 },
  { name: "Pina Colada", id: 7, image: "candleImages/pinaColada.jpg", season: "Summer", size: "Large", price: 17.99 },
  { name: "Peppermint", id: 8, image: "candleImages/peppermint.jpg", season: "Winter", size: "Medium", price: 8.99 },
  { name: "Apricot Rose", id: 9, image: "candleImages/apricotRose.png", season: "Spring", size: "Large", price: 16.99 },
  { name: "Amber Vanilla", id: 10, image: "candleImages/amberVanilla.jpg", season: "Fall", size: "Medium", price: 9.99 },
  { name: "Chai Latte", id: 11, image: "candleImages/chaiLatte.jpg", season: "Fall", size: "Small", price: 3.99 }
]

function App() {
  const [sizeType, setSizeType] = useState("All Sizes");
  const [seasonType, setSeasonType] = useState("All Seasons");
  const [sortType, setSortType] = useState("Prices Low To High");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0
  });


  const selectSortType = eventKey => {
    console.log(eventKey.target.value)
    setSortType(eventKey.target.value);
  };
  const selectFilterSizeType = eventKey => {
    setSizeType(eventKey.target.value);
  };

  const selectFilterSeasonType = eventKey => {
    setSeasonType(eventKey.target.value);
  };

  const matchesFilterSeason = item => {
    // all items should be shown when no filter is selected
    if (seasonType === "All Seasons") {
      return true
    } else if (seasonType === item.season) {
      return true
    } else {
      return false
    }
  }

  const matchesFilterSize = item => {
    // all items should be shown when no filter is selected
    if (sizeType === "All Sizes") {
      return true
    } else if (sizeType === item.size) {
      return true
    } else {
      return false
    }
  }

  const sortFunc = (a, b) => {
    console.log("sortType: ", sortType)
    if (sortType == "Prices Low To High") {
      if (a.price > b.price) {
        return 1
      } else if (a.price == b.price) {
        return 0
      } else {
        return -1
      }
    } else if (sortType == "Prices High To Low") {
      if (a.price < b.price) {
        return 1
      } else if (a.price == b.price) {
        return 0
      } else {
        return -1
      }
    }
  }


  let filteredData = candleData.filter(matchesFilterSeason)
  filteredData = filteredData.filter(matchesFilterSize)
  filteredData = filteredData.sort(sortFunc)


  return (
    <div className="App">
      <h1>My Super Great Candle Shop</h1>

      <div className='rowContainer'>
        <div className='descriptionWithDropdown'>
          <h2> Filter By Season: </h2>
          <select value={seasonType} onChange={selectFilterSeasonType}>
            <option name="All Seasons">All Seasons</option>
            <option name="winter">Winter</option>
            <option name="summer">Summer</option>
            <option name="fall">Fall</option>
            <option name="spring">Spring</option>
          </select>
        </div>
        <div className='descriptionWithDropdown'>
          <h2> Filter By Candle Size: </h2>
          <select value={sizeType} onChange={selectFilterSizeType}>
            <option name="All Sizes">All Sizes</option>
            <option name="Small">Small</option>
            <option name="Medium">Medium</option>
            <option name="Large">Large</option>
          </select>
        </div>
        <div className='descriptionWithDropdown'>
          <h2> Sort By : </h2>
          <select value={sortType} onChange={selectSortType}>
            <option name="Prices Low To High">Prices Low To High</option>
            <option name="Prices High To Low">Prices High To Low</option>
          </select>
        </div>
      </div>

      <div className="rowContainer">
        <div className="CandleGallery">
          {filteredData.map((item) => ( // TODO: map bakeryData to BakeryItem components
            // bakery Items have name, description, image, price
            ShopItemGallery(item, cartTotal, setCartTotal, cartItems, setCartItems)
          ))}
        </div>

        <div>
          <h2>Cart</h2>
          <h2>Cart Total: {Math.round(cartTotal * 100) / 100} </h2>
          {candleData.map((item) => ( // TODO: map bakeryData to BakeryItem components
            // bakery Items have name, description, image, price
            ShopItemCart(item, cartTotal, setCartTotal, cartItems, setCartItems)
          ))}
        </div>
      </div>
    </div >
  );
}

function DecreaseItemCount(item, cartTotal, setCartTotal, cartItems, setCartItems) {
  let copiedShopCart = { ...cartItems };
  if (copiedShopCart[item.id] >= 0) {
    copiedShopCart[item.id] = copiedShopCart[item.id] - 1;
  }
  return (
    <button className="CartButton" onClick={() => {
      if (copiedShopCart[item.id] >= 0) {
        setCartTotal(cartTotal - item.price);
        setCartItems(x => ({
          ...copiedShopCart
        }))
      }
    }
    }>-</button>
  )
}

function IncreaseItemCount(item, inGallery, cartTotal, setCartTotal, cartItems, setCartItems) {
  let words = "+"
  let cartButton = "CartButton"
  if (inGallery) {
    words = "Add To Cart!"
    cartButton = "GalleryButton"
  }
  let copiedShopCart = { ...cartItems };
  copiedShopCart[item.id] = copiedShopCart[item.id] + 1;

  return (
    <button className={cartButton} onClick={() => {
      setCartTotal(cartTotal + item.price);
      setCartItems(x => ({
        ...copiedShopCart
      }))
    }
    }>{words}</button>
  )
}

function ShopItemGallery(item, cartTotal, setCartTotal, cartItems, setCartItems) {
  return (
    <div className="ShopItemGallery">
      <h2> {item.name} </h2>
      <img src={item.image} height="300px" width="300px" ></img>
      <p> ${item.price} </p>
      {IncreaseItemCount(item, true, cartTotal, setCartTotal, cartItems, setCartItems)}
    </div >

  );
}

function ShopItemCart(item, cartTotal, setCartTotal, cartItems, setCartItems) {
  if (cartItems[item.id] > 0) {
    return (
      <div className="ShopItemCart">
        <h2> {item.name} </h2>
        <p> ${item.price} </p>
        <div className='ItemCounter'>
          {DecreaseItemCount(item, cartTotal, setCartTotal, cartItems, setCartItems)}
          <p> {cartItems[item.id]} </p>
          {IncreaseItemCount(item, false, cartTotal, setCartTotal, cartItems, setCartItems)}
        </div>
      </div >

    );
  }
}




export default App;
