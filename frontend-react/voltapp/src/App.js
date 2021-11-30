import React from 'react';
import './App.css';
import products from './products.json';
import orders from './orders.json';
import tempOrder from './tempOrder.json';
import ManagerView from './components/ManagerView';
import MenuBar from './components/MenuBar';
import ContentContainer from './components/ContentContainer';
import SideBar from './components/SideBar';




import data from './data.json'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      products: products.products,
      orders: orders.orders,
      tempOrder: tempOrder.order,
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
      
      },

      restaurant: {
        
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

  customerActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"MAIN", createRestaurantActive: false, 
  user: 
    { 
      userId: 3,
      firstName: "Cynthia",
      surName: "Myth",
      address: "Wowisle 62",
      postNumber: 21146,
      isManager: false
    }

  })}

  managerActivate = () => { this.setState( {actionDone:false, role:"MANAGER", actionString:"MAIN",
  
    user: 
    { 
      userId: 3,
      firstName: "Cynthia",
      surName: "Myth",
      address: "Wowisle 62",
      postNumber: 21146,
      isManager: true
    },
    
    restaurant: 
    {
      restaurantId:3,
      restaurantType:"CAFE"
    }

  })}

  managerOrderOverviewActivate = () => {this.setState( {actionDone:false, actionString:"ORDERS", orderviewActive:false, managerOrderHistoryActive:false })}

  managerOrderHistoryActivate = () => {this.setState( {actionDone:false, actionString:"ORDERHISTORY"})}

  defaultActivate = () => { this.setState( {actionDone:false, role:"", actionString:"MAIN", orderviewActive:false, managerOrderHistoryActive:false, createRestaurantActive: false, user: {userId: null,
    firstName: null,
    surName: null,
    address: null,
    postNumber: null,
    isManager: false} }) } 

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

    copyOfOrders[orderId-1].orderPreparedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()

    this.setState({ orders: copyOfOrders })
  
    clearInterval(this.intervalTimerId);
    }
  
  setToDispatched = (orderId) => {

      let anotherCopyOfOrders = [...this.state.orders]
  
      anotherCopyOfOrders[orderId-1].orderStatus = 'DISPATCHED'

      anotherCopyOfOrders[orderId-1].orderDispatchedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  
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
            newOrders[i].orderStatus = 'DELIVERED'
            newOrders[i].orderDeliveredAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
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

    var id = Math.max.apply(Math, newItems.map(function(o) { return o.id; }))

    

    newItems.push({
      id: ++id,
      restaurantId: this.state.restaurant.restaurantId, 
      foodName:newFoodName,
      category: this.state.restaurant.restaurantType,
      description: newDescription,
      photoPath: newMenuItemUrl,
      prepareTime: newPrepareTime, 
      price: newPrice
    })

    this.setState({
      items:newItems
    });
    
  }

  confirmOrder = () => {
    let newOrders = [...this.state.orders]
        
        for(var i in newOrders){

          if(newOrders[i].customerId === this.state.user.userId && newOrders[i].orderStatus === 'DELIVERED'){
            newOrders[i].orderStatus = 'DONE'
            newOrders[i].orderDoneAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()

        console.log("This should be handled differently via Spring or AXIOS.")

          this.setState({orders:newOrders});
          }
        }
  }

  overviewChange = id => { 
    this.setState({overviewId: id, orderviewActive:true})
  }

//   getSumTotal = (arr, key) => {
//     return arr.reduce((acc, cur) => acc + Number(cur[key]), 0)
//  }
//  { getSumTotal(this.state.tempOrder, 'price')}

  addToOrder = (id,restaurantId,foodName,photoPath,price,prepareTime) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    var actionDone = false
    let idcheck
    
    if(!newTemplateOfOrder.findIndex(index => index.id === id) && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    if(!newTemplateOfOrder.findIndex(index => index.id === id) === false && newTemplateOfOrder.findIndex(index => index.id === id) === -1 && actionDone === false)
      {
        newTemplateOfOrder.push({"id":id,"restaurantId":restaurantId,"foodName":foodName,"photoPath":photoPath,"price":price,"prepareTime":prepareTime, "quantity":1})
        actionDone = true;
      }
    if(newTemplateOfOrder.findIndex(index => index.id === id) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    this.setState({tempOrder:newTemplateOfOrder})
  }

  render() 
  {

    let elementContainer =
    <>
    <div className="elementContainer">
      { this.state.containerActive ?

      <div>
        <ContentContainer
          items = { this.state.items}
          restaurant = { this.state.restaurant}
          orders={this.state.orders} 
          overviewId={this.state.overviewId}
          searchResultsActive = {this.state.searchResultsActive}
          editUserActive = { this.state.editUserActive }
          registerUserActive = { this.state.registerUserActive }
          editRestaurantActive = { this.state.editRestaurantActive }
          editRestaurantMenuActive = { this.state.editRestaurantMenuActive }
          managerOrderHistoryActive = { this.state.managerOrderHistoryActive }
          orderviewActive = { this.state.orderviewActive}
          createRestaurant = { this.state.createRestaurant}
          productSearchString = { this.state.productSearchString}
          deleteItem ={ this.deleteItem }
          addToOrder ={ this.addToOrder }
          addNewRestaurant={ this.addNewRestaurant}
          defaultActivate={ this.defaultActivate}    
        />

        <SideBar
          orders = { this.state.orders }
          user = { this.state.user }
          restaurant = {this.state.restaurant}
          tempOrder = {this.state.tempOrder}
          shoppingCartQuickviewActive= {this.state.shoppingCartQuickviewActive}
          editRestaurantMenuQuickviewActive= {this.state.editRestaurantMenuQuickviewActive }
          managerOrderHistoryActive= {this.state.managerOrderHistoryActive}
          addNewMenuItem={this.addNewMenuItem}
          overviewChange={this.overviewChange}
          confirmOrder={this.confirmOrder}
        />
      </div>

      : 

        <ManagerView 
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

                      ,orderviewActive:false
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

                    ,orderviewActive:false
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

                      ,orderviewActive:false
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

                      ,orderviewActive:false
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

                      ,orderviewActive:false
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

                      ,orderviewActive:true
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

                      orderviewActive:false
                      ,actionDone:true
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
                      managerBarActive: true   /////////////////////////////////////////////////

                      ,orderviewActive:false
                      ,editRestaurantMenuActive:true
                      ,editRestaurantMenuQuickviewActive: true
                      
                      ,actionDone:true

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

                        ,orderviewActive:false
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

                    ,orderviewActive:false
                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }
                  
                case "LOGIN":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,orderviewActive:false
                    ,createRestaurant: false
                    ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "REGISTER":
                  if(this.state.actionDone === false){
                    return this.setState({

                    actionDone:true

                    ,orderviewActive:false
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

                      ,orderviewActive:false
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
