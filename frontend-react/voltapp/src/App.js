import React from 'react';
import './App.css';
import products from './products.json';
import orders from './orders.json';
import ManagerView from './components/ManagerView';
import MenuBar from './components/MenuBar';
import MenuView from './components/MenuView';
import Orderview from './components/Orderview';
import CreateRestaurant from './components/CreateRestaurant';
import AddMenuItem from './components/AddMenuItem';

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

      overviewId:1,

      user: {
        restaurantId:3,
        restaurantType:"CAFE"
      },

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
      createRestaurant: false,

      sideBarActive: true,
      shoppingCartQuickviewActive: true,
      editRestaurantMenuQuickviewActive: false,
      showUserOrderHistoryActive: false,
      showRestaurantOrderHistoryActive: false
    }

  }
 

  

  // MENUBAR COMMANDS

  customerActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"MAIN", createRestaurantActive: false}) }

  managerActivate = () => { this.setState( {actionDone:false, role:"MANAGER", actionString:"MAIN"}) }

  managerOrderOverviewActivate = () => {this.setState( {actionDone:false, actionString:"ORDERS", orderviewActive:false, managerOrderHistoryActive:false })}

  managerOrderHistoryActivate = () => {this.setState( {actionDone:false, actionString:"ORDERHISTORY"})}

  defaultActivate = () => { this.setState( {actionDone:false, role:"", actionString:"MAIN", orderviewActive:false, managerOrderHistoryActive:false, createRestaurantActive: false }) } 

  createRestaurantActive = () => { this.setState( {actionDone:false, role:"MANAGER", actionString:"EDITCREATERESTAURANT"})}

  editRestaurantMenuActive = () => { this.setState( {actionDone:false, role:"MANAGER",actionString:"EDITCREATERESTAURANTMENU"})}

  addNewRestaurant = (newRestaurantName, newAddress, newPostNumber, 
    newRestaurantUrl, newOperatingHours, newRestaurantType, newPricelevel) => { 
    console.log(newRestaurantName, newAddress, newPostNumber, 
      newRestaurantUrl, newOperatingHours, newRestaurantType, newPricelevel)
    console.log("nämä pitäisi lähettää eteenpäin.")

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

  componentDidMount(){
      this.setState({intervalId: setInterval(() => {
        this.prepareTimer()
      }, 1000)})
      }

  componentWillUnmount(){
      clearInterval(this.state.intervalId)
    }

  onSearchFieldChange = (event) => {
      console.log('Keyboard event');
      console.log(event.target.value);
      this.setState({ productSearchString: event.target.value });
    }

  deleteItem = itemId => {

  let newItems = [...this.state.items]

      let index = newItems.map((item) => item.id).indexOf(itemId);
      
        newItems.splice(index, 1);
      
        console.log("Instead doing this, this should send itemId to Spring Boot and pop the item with that id off from the database.")

  this.setState({items:newItems})
    
  }

  addNewMenuItem = (newFoodName, newDescription,
    newMenuItemUrl, newPrepareTime, newPrice) => { 

    let newItems = [...this.state.items];

    let numberArray = [];

    for(var i in newItems){
      numberArray.push(i.id)
    }

    let id=Math.max(...numberArray);

    newItems.push({
      id: id+1,
      restaurantId: this.state.user.restaurantId, 
      foodName:newFoodName,
      category: this.state.user.restaurantType,
      description: newDescription,
      photoPath: newMenuItemUrl,
      prepareTime: newPrepareTime, 
      price: newPrice
    })

    this.setState({
      items:newItems
    });
    
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
            (item.category.toLowerCase().includes(this.state.productSearchString.toLowerCase())||
            //(item.restaurantId.includes(this.state.productSearchString))||
            (item.foodName.toLowerCase().includes(this.state.productSearchString.toLowerCase())))) }
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
        <MenuView items={ this.state.items.filter((item) => 
            (item.restaurantId === this.state.user.restaurantId))}
        deleteItem ={ this.deleteItem }/>
    </div>
    </>

    let createRestaurantView = 
    <>
    <div>
      
    </div>
    </>


    let managerOrderHistoryOverview = 
    <>
    <div>
      
            
    </div>
    </>



    let managerOrderHistoryList = 
    <>
      <div className="ManagerOrderHistoryListContainer">
          ORDER HISTORY:
      
            <div className="OrderHistoryList">
              {this.state.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantId === this.state.user.restaurantId ).map((item,index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusPlaced">{item.orderStatus}</b><br/><i>---Review and Confirm arrived---</i> <br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
              </div>)}
              
              {this.state.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantId === this.state.user.restaurantId).map((item,index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusOnGoing">IN PREPARATION</b> <b>Ready in:</b> <b className="orderStatusOnGoing">{item.prepareTime}</b><br/><i>---Cooking Takes Time---</i> <br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.restaurantId === this.state.user.restaurantId).map((item, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusRDT">READY TO DISPATCH</b><br/><i>---Waiting Courier to Pick up---</i> <br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.restaurantId === this.state.user.restaurantId).map((item, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusOnGoing">{item.orderStatus}</b> <b>Delivered in:</b> <b className="orderStatusOnGoing">{item.deliveryTime}</b><br/><i>---Voltman Is Delivering---</i> <br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DELIVERED' && order.restaurantId === this.state.user.restaurantId).map((item, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusDelivered">{item.orderStatus}</b> <br/><i>---Waiting Customer to Confirm---</i><br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
              </div>)}

              {this.state.orders.filter(order => order.orderStatus === 'DONE' && order.restaurantId === this.state.user.restaurantId).map((item, index) => 
            <div className="OrderHistoryListItems" key ={index}>
              <button onClick={() => this.setState({ overviewId: item.id, orderviewActive: true })}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className="orderStatusDone">{item.orderStatus}</b> <br/>
              DD/MM/YYYY - {item.customerName} <hr className="hrList"/>
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
          <AddMenuItem addNewMenuItem={this.addNewMenuItem}/>
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
        { this.state.orderviewActive? <Orderview orders={this.state.orders} overviewId={this.state.overviewId}/> : <></>}
        { this.state.createRestaurant? <CreateRestaurant addNewRestaurant = { this.addNewRestaurant } defaultActivate = {this.defaultActivate} /> : <> </>}
        </div>
      </>
    
    let sideBarContainer =
      <>
        <div className="sideBar">
        { this.state.shoppingCartQuickviewActive? <div>{ shoppingCartQuickview }</div> : <></>}
        { this.state.editRestaurantMenuQuickviewActive? <div>{ editRestaurantMenuQuickview }</div> : <></>}
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

          createRestaurantActive={this.createRestaurantActive}
          managerActivate={this.managerActivate}
          customerActivate={this.customerActivate}
          defaultActivate={this.defaultActivate}
          managerOrderOverviewActivate={ this.managerOrderOverviewActivate }
          managerOrderHistoryActivate={ this.managerOrderHistoryActivate}
          editRestaurantMenuActive = {this.editRestaurantMenuActive}
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                }
                case "ORDERHISTORY":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "EDITCUSTOMER":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }
                default:
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                  });
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "EDITCREATERESTAURANT":
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
                      managerOrderHistoryActive: false,
                      searchResultsActive: false,
                      managerBarActive: true,
                      createRestaurant: true,

                      actionDone:true
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "EDITCREATERESTAURANTMENU":
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
                      managerOrderHistoryActive: false,
                      searchResultsActive: false,
                      managerBarActive: true,   /////////////////////////////////////////////////

                      editRestaurantMenuActive:true,
                      editRestaurantMenuQuickviewActive: true,
                      
                      actionDone:true

                    ,createRestaurant: false
                    });
                  }
                default:
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

                        ,createRestaurant: false
                        ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
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

                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }
                  
                case "LOGIN":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "REGISTER":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }
                default:
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

                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                      });
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
