import React from 'react';
import './App.css';
import products from './products.json'
import orders from './orders.json'
import ManagerView from './components/ManagerView'
import MenuBar from './components/MenuBar'

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

      logout: true,
      defaultFormat:false,

    
      authenticatorFormatterActive: false,

      items: data.items,
      productSearchString: "",

      menuBarActive: true,
      defaultUserBarActive: true,
      defaultBarWithoutSearchActive: false,
      customerBarActive: false,
      customerEditBarActive: false,
      userBarWithoutSearchActive: false,
      managerBarActive: false,
      managerEditBarActive: false,

      testBarActive: false,
      
      containerActive: true,

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


  moveToPreparation = (orderId) => {

    let copyOfOrders = [...this.state.orders]
  
    copyOfOrders[orderId-1].orderStatus = "IN_PREPARATION"
  
    this.setState({ orders: copyOfOrders })
  
    }
  
  setToDispatched = (orderId) => {
  
      let anotherCopyOfOrders = [...this.state.orders]
  
      anotherCopyOfOrders[orderId-1].orderStatus = 'DISPATCHED'
  
      this.setState({ orders: anotherCopyOfOrders })
    }
  
    
  
    prepareTimer = () => {

      let newOrders = [...this.state.orders]
      
      for(var i in newOrders){
        if(newOrders[i].orderStatus === 'IN_PREPARATION'){
          newOrders[i].prepareTime--
        }
        if(newOrders[i].orderStatus === 'DISPATCHED'){
          newOrders[i].deliveryTime--
        }
        if(newOrders[i].prepareTime === 0 && newOrders[i].orderStatus === 'IN_PREPARATION'){
          newOrders[i].orderStatus = 'READY_TO_DISPATCH'
        }
        if(newOrders[i].deliveryTime === 0 && newOrders[i].orderStatus === 'DISPATCHED'){
          //newOrders[i].orderStatus = 'DELIVERED'
          newOrders[i].orderStatus = 'PLACED'
          newOrders[i].prepareTime = 15
          newOrders[i].deliveryTime = 15
        }
      }
    
      this.setState({
        orders:newOrders
      });
    }
    
  
  
  
    onSearchFieldChange = (event) => {
  
      console.log('Keyboard event');
      console.log(event.target.value);
      this.setState({ productSearchString: event.target.value });
    }
  
  // MENUBAR COMMANDS

  customerActivate = () => { this.setState( {customerModeActive: true, authenticatorFormatterActive: true}) }

  managerActivate = () =>{ this.setState( {managerModeActive: true, authenticatorFormatterActive: true}) }

  defaultActivate = () =>{ this.setState( {defaultUserModeActive: true, customerModeActive: false, managerModeActive: false }) }

  render() 
  {

    
        // CONTENT CONTAINER ELEMENTS - PITÄÄ MIETTIÄ LISÄTÄÄNKÖ TOTEUTUKSET OMAAN LUOKKAAN?

    let searchResults = 
    <>
    <div>
      PRODUCTS:
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
      <div className="shoppingCart">SHOPPING CART:</div>
    </div>
    <button className="orderReviewButton">Review Shopping Cart</button>
    </>

    let editRestaurantMenuQuickview = 
    <>
    <div>

    </div>
    </>
    

    if(this.state.defaultUserModeActive === true && this.state.customerModeActive === false && this.state.managerModeActive === false && this.state.defaultFormat === false && this.state.logout === true){
      this.setState({ 
        customerModeActive: false,
        managerModeActive: false,
        managerBarActive: false,
        customerBarActive: false ,
        sideBarActive: true,
        contentViewActive: true,
        containerActive: true,
        defaultUserBarActive: true,

        logout: false,
        defaultFormat: true
      })
    }


    if(this.state.customerModeActive  === true && this.state.authenticatorFormatterActive === true){
      this.setState({ 

        
        defaultUserModeActive: false, 
        defaultUserBarActive: false,
        defaultUserBarWithoutSearchBar: false,
        managerModeActive: false,
        customerBarActive: true ,
        sideBarActive: true,
        contentViewActive: true,

        logout: true,
        defaultFormat: false,
        authenticatorFormatterActive: false  
      })
    }

    if(this.state.managerModeActive === true && this.state.authenticatorFormatterActive === true){
      this.setState({

        defaultUserBarActive: false,
        defaultModeActive: false,
        customerModeActive: false,
        customerBarActive: false,
        defaultBarWithoutSearchActive: false,
        customerEditBarActive: false,
        userBarWithoutSearchActive: false,

        containerActive: false,
        managerBarActive: true,
        
        logout: true,
        defaultFormat: false,
        authenticatorFormatterActive: false 

      })

    }

    

      // NÄKYMIEN TOTEUTUKSEN EHTOLAUSEKKEET SAI TOTEUTETTUA JSX:N KANSSA TERNARY OPERAATTORILLA

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

    let elementContainer =
    <>
    <div className="elementContainer">
      { this.state.containerActive? <div>{contentContainer}{sideBarContainer}</div> : <ManagerView 
            moveToPreparation={ this.moveToPreparation } 
            setToDispatched = { this.setToDispatched } 
            prepareTimer={ this.prepareTimer }
            products= { this.state.products } 
            orders= { this.state.orders }/>
            }
    </div>
    </>

      let output = 
      <>
        <div>
          <MenuBar
          menuBarActive={this.state.menuBarActive}
          defaultUserBarActive={this.state.defaultUserBarActive}
          defaultBarWithoutSearchActive={this.state.defaultBarWithoutSearchActive}
          customerBarActive={this.state.customerBarActive}
          customerEditBarActive={this.state.customerEditBarActive}
          userBarWithoutSearchActive={this.state.userBarWithoutSearchActive}
          managerBarActive={this.state.managerBarActive}
          managerEditBarActive={this.state.managerEditBarActive}
          onSearchFieldChange={this.onSearchFieldChange}

          managerActivate={this.managerActivate}
          customerActivate={this.customerActivate}
          defaultActivate={this.defaultActivate}
          />
          {/* {menuBarContainer} */}
          <div className="wrapper">
          { elementContainer }
          </div>
        </div>
      </>


  return (
    <>
    { output }
    </>
    )
  }
}

export default App;
