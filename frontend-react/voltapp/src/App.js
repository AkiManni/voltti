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

      items: data.items,
      productSearchString: "",


      actionDone:false,
      role:"",
      actionString:"MAIN",

      intervalId:"",

      menuBarActive: true,
      defaultUserBarActive: true,
      defaultBarWithoutSearchActive: false,
      customerBarActive: false,
      customerEditBarActive: false,
      userBarWithoutSearchActive: false,
      managerBarActive: false,
      managerEditBarActive: false,

      containerActive: true,

      searchResultsActive: true,
      editUserActive: false,
      registerUserActive: false,
      editRestaurantActive: false,
      editRestaurantMenuActive: false,
      managerOrderHistoryActive: false,
      orderviewActive: false,

      sideBarActive: true,
      shoppingCartQuickviewActive: true,
      editRestaurantQuickviewActive: false,
      showUserOrderHistoryActive: false,
      showRestaurantOrderHistoryActive: false
    }

  }


  moveToPreparation = (orderId) => {

    let copyOfOrders = [...this.state.orders]
  
    copyOfOrders[orderId-1].orderStatus = "IN_PREPARATION"
  
    this.setState({ orders: copyOfOrders })
  
    clearInterval(this.intervalTimerId);
    }
  
  setToDispatched = (orderId) => {

      let anotherCopyOfOrders = [...this.state.orders]
  
      anotherCopyOfOrders[orderId-1].orderStatus = 'DISPATCHED'
  
      this.setState({ orders: anotherCopyOfOrders })
      clearInterval(this.intervalTimerId);
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

  customerActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"MAIN"}) }

  managerActivate = () =>{ this.setState( {actionDone:false, role:"MANAGER", actionString:"MAIN"}) }

  managerOrderOverviewActivate = () =>{this.setState( {actionDone:false, actionString:"ORDERS"})}

  managerOrderHistoryActivate = () =>{this.setState( {actionDone:false, actionString:"ORDERHISTORY"})}

  defaultActivate = () =>{ this.setState( {actionDone:false, role:"", actionString:"MAIN" }) } 
  

  componentDidMount(){
    this.state.intervalId = setInterval(() => {
      this.prepareTimer()
    }, 1000);
    }

    componentWillUnmount(){
      clearInterval(this.state.intervalId)
    }

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

    let managerOrderHistoryOverview = 
    <>
    <div>
        TÄHÄN MAPPAUS VIEREISELTÄ LISTALTA VALITUSTA TILAUKSESTA
    </div>
    </>

    let managerOrderHistoryList = 
    <>
      <div className="ManagerOrderHistoryListContainer">
          ORDER HISTORY:
      
            <div className="OrderHistoryList">
              {this.state.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <b className="orderStatusPlaced">{orderItem.orderStatus}</b> <br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}
              
              {this.state.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <br/><b className="orderStatusOnGoing">{orderItem.orderStatus}</b> <b>Ready in:</b> <b className="orderStatusOnGoing">{orderItem.prepareTime}</b> <br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <b className="orderStatusOnGoing">{orderItem.orderStatus}</b> <br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <br/><b className="orderStatusOnGoing">{orderItem.orderStatus}</b> <b>Delivered in:</b> <b className="orderStatusOnGoing">{orderItem.deliveryTime}</b> <br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DELIVERED' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <b className="orderStatusDelivered">{orderItem.orderStatus}</b> <br/><i>---Waiting Customer to Confirm---</i><br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DONE' && order.restaurantId === 3).map((orderItem, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button>View Order</button> <b>Order: {orderItem.id}.</b> <b className="orderStatusDone">{orderItem.orderStatus}</b> <br/>
              DD/MM/YYYY - {orderItem.customerName} 
              </div>)}

          </div>
      </div>
    </>

    let orderHistory = 
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
    

      // NÄKYMIEN TOTEUTUKSEN EHTOLAUSEKKEET SAI TOTEUTETTUA JSX:N KANSSA TERNARY OPERAATTORILLA

    let contentContainer =
      <>
        <div className="contentContainer">

        { this.state.searchResultsActive ? <div>{ searchResults }</div> : <></>}
        { this.state.editUserActive ? <div>{ editUserForm }</div> : <></>}
        { this.state.registerUserActive ? <div>{ registerForm }</div> : <></>}
        { this.state.editRestaurantActive ? <div>{ editRestaurantForm }</div> : <></>}
        { this.state.editRestaurantMenuActive ? <div>{ searchProductsByRestaurant }</div> : <></>}
        { this.state.managerOrderHistoryActive ? <div>{managerOrderHistoryOverview}</div> : <></>}

        </div>
      </>
    
    let sideBarContainer =
      <>
        <div className="sideBar">
        { this.state.shoppingCartQuickviewActive? <div>{ shoppingCartQuickview }</div> : <></>}
        { this.state.editRestaurantQuickviewActive? <div>{ editRestaurantMenuQuickview }</div> : <></>}
        { this.state.managerOrderHistoryActive? <div>{managerOrderHistoryList}</div> : <></>}
        </div>
      </>

    let elementContainer =
    <>
    <div className="elementContainer">
      { this.state.containerActive? <div>{contentContainer}{sideBarContainer}</div> : <ManagerView 
            moveToPreparation={ this.moveToPreparation } 
            setToDispatched = { this.setToDispatched } 
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
          managerOrderOverviewActivate={ this.managerOrderOverviewActivate }
          managerOrderHistoryActivate={ this.managerOrderHistoryActivate}
          />
          {()=> {this.renderSwitch()}}

          
          <div className="wrapper">
          { elementContainer }
          </div>
        </div>
      </>


  return (
    <>


    
  {(() => {

  // PITÄÄ MIETTIÄ JWT:N JA PALAUTETUN USER DATAN KANSSA TOIMIMAAN:
  switch(this.state.role){
    case "CUSTOMER":
        switch(this.state.actionString){
          case "MAIN":
            if(this.state.actionDone === false){
              return this.setState({
                defaultUserModeActive: false, 
                defaultUserBarActive: false,
                defaultUserBarWithoutSearchBar: false,
                managerModeActive: false,
                customerBarActive: true ,
                sideBarActive: true,
                shoppingCartQuickviewActive: true, 

                actionDone:true
              });
              break;
          }
          case "ORDERHISTORY":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

          case "EDITCUSTOMER":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

        }
      
    case "MANAGER":
        switch(this.state.actionString){
          case "MAIN":
            if(this.state.actionDone === false){
            return this.setState({
                defaultUserBarActive: false,
                defaultModeActive: false,
                customerModeActive: false,
                customerBarActive: false,
                defaultBarWithoutSearchActive: false,
                customerEditBarActive: false,
                userBarWithoutSearchActive: false,
                containerActive: false,
                managerBarActive: true,
                actionDone:true
            });
            break;
          }
          case "ORDERS":
            if(this.state.actionDone === false){
              return this.setState({
                defaultUserBarActive: false,
                defaultModeActive: false,
                customerModeActive: false,
                customerBarActive: false,
                defaultBarWithoutSearchActive: false,
                customerEditBarActive: false,
                userBarWithoutSearchActive: false,
                containerActive: false,
                managerBarActive: true,
                actionDone:true
              });
              break;
            }

          case "ORDERHISTORY":
            if(this.state.actionDone === false){
              return this.setState({
                defaultUserBarActive: false,
                defaultModeActive: false,
                customerModeActive: false,
                customerBarActive: false,
                defaultBarWithoutSearchActive: false,
                customerEditBarActive: false,
                userBarWithoutSearchActive: false,
                containerActive: true,
                shoppingCartQuickviewActive: false, 
                managerOrderHistoryActive: true,
                searchResultsActive: false,
                managerBarActive: true,
                actionDone:true
              });

              break;
            }

          case "EDITCREATERESTAURANT":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

          case "EDITCREATERESTAURANTMENU":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

        }

    default:
        switch(this.state.actionString){
          case "MAIN":
            if(this.state.actionDone === false){
            return this.setState({ 
              customerModeActive: false,
              managerModeActive: false,
              managerBarActive: false,
              customerBarActive: false ,
              sideBarActive: true,
              containerActive: true,
              defaultUserBarActive: true,
              shoppingCartQuickviewActive: true, 
              searchResultsActive: true,
              actionDone:true
              });
              break;
            }
            
          case "LOGIN":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

          case "REGISTER":
            if(this.state.actionDone === false){
              return this.setState({

              actionDone:true
              });
              break;
            }

        }
      }
  })()}

    { output }
    
    </>
    )
  }
}

export default App;
