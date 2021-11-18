import React from 'react';
import './App.css';
import products from './products.json'
import orders from './orders.json'
import ManagerView from './components/ManagerView'

import SearchView from './components/SearchView';
import data from './data.json'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      products: products.products,
      orders: orders.orders,
      managerModeActive:false,
      defaultUserModeActive: true,
      customerModeActive: false,

      items: data.items,
      productSearchString: "",

      menuBarActive: true,
      defaultUserBarActive: true,
      customerBarActive: false,
      customerEditBarActive: false,
      managerBarActive: false,
      managerEditBarActive: false,
      defaultBarWithoutSearchActive: false,
      userBarWithoutSearchActive: false,

      contentViewActive: true,  // TARVIIKO TÄTÄ?
      searchResultsActive: true,
      editUserActive: false,
      registerUserActive: false,
      editRestaurantActive: false,
      editRestaurantMenuActive: false,
      managerOrderviewActive: false,
      orderviewActive: false,

      sideBarActive: true,
      shoppingCartQuickviewActive: true,   // MUOKATTU
      editRestaurantQuickviewActive: false
    }

  }

  onSearchFieldChange = (event) => {

    console.log('Keyboard event');
    console.log(event.target.value);
    this.setState({ productSearchString: event.target.value });
  }

  render() 
  {


    // MENUBARIN ELEMENTTIEN TOTEUTUS - PITÄÄ MIETTIÄ VIEDÄÄNKÖ TOTEUTUKSET OMAAN LUOKKAAN JA KUTSUTAAN SITTEN RENDERIN SISÄLLÄ?

    let defaultUserBar = 
    <>
    <div className="searchBar">
    Search: <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.productSearchString }/> 
      <button onClick={() => this.setState({managerModeActive: !this.state.managerModeActive})}>Manager</button>
    </div>
    </>

    let defaultUserBarWithoutSearchBar = 
    <>
    <div>
        
    </div>
    </>

    let customerBar =
    <>
    <div>
        
    </div>
    </>

    let customerBarWithoutSearchBar = 
    <>
    <div>

    </div>
    </>

    let managerBar =
    <>
    <div>

    </div>
    </>

    let managerEditBar = 
    <>
    <div>

    </div>
    </>

        // CONTENT CONTAINER ELEMENTS - PITÄÄ MIETTIÄ LISÄTÄÄNKÖ TOTEUTUKSET OMAAN LUOKKAAN?

    let searchResults = 
    <>
    <div>
      IHASTELKAA MUN TUOTTEITA:
          <SearchView
          items={ this.state.items.filter((item) => 
            (item.manufucturer.includes(this.state.productSearchString)||
            (item.type.includes(this.state.productSearchString))||
            (item.name.includes(this.state.productSearchString)))) }
          />
    </div>
    </>

    let editUserForm =
    <>
    <div>

    </div>
    </>

    let registerForm =
    <>
    <div>

    </div>
    </>

    let editRestaurantForm =
    <>
    <div>

    </div>
    </>

    let searchProductsByRestaurant = 
    <>
    <div>
        TÄNNE PITÄÄ LAITTAA VASTAAVA SEARCHVIEW - PAITSI FILTER BY RESTAURANT_ID
    </div>
    </>

    let managerOrderOverview = 
    <>
    <div>

    </div>
    </>

    let orderOverview = 
    <>
    <div>

    </div>
    </>

        // SIDEBAR CONTENT ELEMENTS - PITÄÄ MIETTIÄ LISÄTÄÄNKÖ TOTEUTUKSET OMAAN LUOKKAAN?

    let shoppingCartQuickview =
    <>
    <div>
      SHOPPING CART
      <div className="shoppingCart">TÄSSÄ OLISI TUOTE:</div>
    </div>
    </>

    let editRestaurantMenuQuickview = 
    <>
    <div>

    </div>
    </>
    

    



      

      // NÄKYMIEN TOTEUTUKSEN EHTOLAUSEKKEET SAI TOTEUTETTUA JSX:N KANSSA TERNARY OPERAATTORILLA
    let menuBarContainer =
      <>
        <div className= "menuBar" >

          { this.state.defaultUserBarActive ? <div>{ defaultUserBar }</div> : <></> }
          { this.state.customerBarActive ? <div>{ customerBar }</div> : <></> }
          { this.state.customerEditBarActive ? <div>{customerBarWithoutSearchBar}</div> : <></> }
          { this.state.defaultBarWithoutSearchActive? <div>{ defaultUserBarWithoutSearchBar }</div> : <></> }
          { this.state.managerBarActive ? <div>{ managerBar }</div> : <></> }
          { this.state.managerEditBarActive ? <div>{ managerEditBar }</div> : <></> }

        <img className= "Logo" src={"voltLogo.png"} align="right"/>
        </div>
      </>

    let contentContainer =
      <>
        <div className="contentContainer">

        { this.state.searchResultsActive ? <div>{ searchResults }</div> : <></>}
        { this.state.editUserActive ? <div>{ editUserForm }</div> : <></>}
        { this.state.registerUserActive ? <div>{ registerForm }</div> : <></>}
        { this.state.editRestaurantActive ? <div>{ editRestaurantForm }</div> : <></>}
        { this.state.editRestaurantMenuActive ? <div>{ searchProductsByRestaurant }</div> : <></>}
        { this.state.managerOrderviewActive ? <div>{ managerOrderOverview }</div> : <></>}
        { this.state.orderviewActive? <div>{ orderOverview }</div> : <></>}

        </div>
      </>
    
    let sideBarContainer =
      <>
        <div className="sideBar">
        { this.state.shoppingCartQuickviewActive? <div>{ shoppingCartQuickview }</div> : <></>}
        { this.state.editRestaurantQuickviewActive? <div>{ editRestaurantMenuQuickview }</div> : <></>}
        </div>
      </>

      let output = 
      <>
        <div>
          {menuBarContainer}
          <div className="wrapper">
          {contentContainer}
          { this.state.sideBarActive ? <div>{sideBarContainer}</div> : <div></div> }
          </div>
        </div>
      </>

    if(this.state.managerModeActive){
      
      output = <ManagerView
              disableManagerMode={ () => this.setState({managerModeActive: false})}
              products= { this.state.products }
              orders= { this.state.orders }
              />;
    }

  return (
    <>
    { output }
    </>
    )
  }
}

export default App;
