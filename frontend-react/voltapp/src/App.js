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
    /*


    //Tähän väsätty tämmönen, millä näkyy kirjautuminen ja navbar
<Router>

  <div>
  <Navibar/>
  <Switch>
  <Route path="/login" exact component={Login} />
  <Route path="/register" exact component={Register} />
  <Route path="/" exact component={Home} />
  
    </Switch>

  </div>

  </Router>
    */
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
      ordersClear:[],
      orderPrices:[],
      actionDone:false,
      role:"",
      actionString:"MAIN",
      intervalId:"",
      overviewId:"",
      user: {},
      restaurant: {},
      defaultScroll: false,

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
      customerOrderHistoryActive: false,
      orderviewActive: false,
      createRestaurant: false,
      orderPreviewActive: false,

      sideBarActive: true,
      shoppingCartQuickviewActive: true,
      editRestaurantMenuQuickviewActive: false,
      showUserOrderHistoryActive: false,
      showRestaurantOrderHistoryActive: false
    }

  }

  defaultScrollActivate = () => { 
    if(this.state.defaultScroll === false){this.setState({ defaultScroll: true })} else{ this.setState({ defaultScroll: false })}}
  
  customerActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"MAIN", createRestaurantActive: false, 
  user: 
    { 
      userId: 3,
      firstName: "Guy",
      surName: "Customer",
      address:"Cypress Hole 3",
      postNumber: 21146,
      deliveryTime:20,
      isManager: false
    }

  })}

  managerActivate = () => { this.setState( {actionDone:false, role:"MANAGER", actionString:"MAIN",
  
    user: 
    { 
      userId: 3,
      firstName: "Guy",
      surName: "Customer",
      address:"Cypress Hole 3",
      postNumber: 21146,
      isManager: true
    },
    
    restaurant: 
    {
      restaurantId:1,
      restaurantName:"Hieno Ravintola",
      restaurantType:"FINE"
    }

  })}

  managerOrderOverviewActivate = () => {this.setState( {actionDone:false, actionString:"ORDERS", orderviewActive:false, managerOrderHistoryActive:false })}

  managerOrderHistoryActivate = () => {this.setState( {actionDone:false, actionString:"ORDERHISTORY"})}

  defaultActivate = () => { this.setState( {actionDone:false, role:"", actionString:"MAIN", overviewId:"", 
  orderviewActive:false, managerOrderHistoryActive:false, createRestaurantActive: false, user: {userId: null,
    firstName: null,
    surName: null,
    address: null,
    postNumber: null,
    isManager: false} }) } 

  createRestaurantActive = () => { this.setState( {actionDone:false, role:"MANAGER", actionString:"EDITCREATERESTAURANT"})}

  editRestaurantMenuActive = () => { this.setState( {actionDone:false, role:"MANAGER",actionString:"EDITCREATERESTAURANTMENU"})}

  customerOrderHistoryviewActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"ORDERHISTORY"})}

  addNewRestaurant = (newRestaurantName, newAddress, newPostNumber, 
    newRestaurantUrl, newOperatingHours, newRestaurantType, newPricelevel) => { 
      console.log(newRestaurantName, newAddress, newPostNumber, 
      newRestaurantUrl, newOperatingHours, newRestaurantType, newPricelevel)
      console.log("nämä pitäisi lähettää eteenpäin.")
  }

  previewOrderActivate = () => { this.setState( {actionDone:false, actionString:"ORDERPREVIEW", defaultScroll:true}); 
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

  componentWillUnmount(){ clearInterval(this.state.intervalId)
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
      restaurantName:this.state.restaurant.restaurantName,
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

  addToOrder = (id,restaurantId,restaurantName,foodName,photoPath,price,prepareTime) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    var actionDone = false
    let idcheck

    this.priceSaver(restaurantId,price);
    
    if(!newTemplateOfOrder.findIndex(index => index.id === id) && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    if(!newTemplateOfOrder.findIndex(index => index.id === id) === false && newTemplateOfOrder.findIndex(index => index.id === id) === -1 && actionDone === false)
      {
        newTemplateOfOrder.push({"id":id,"restaurantId":restaurantId,"restaurantName":restaurantName,"foodName":foodName,"photoPath":photoPath,"price":price,"prepareTime":prepareTime, "quantity":1})
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

  reduceFromOrder = (id, restaurantID) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    let newTemplatePrices = [...this.state.orderPrices]
    var actionDone = false
    let idcheck // muuttuja TemplateOrdersin indexille, josta vähennetään tuote - newTemplateOfOrder[idcheck].quantity -=
    let tempResId // muuttuja TemplateOrdersin indexille, josta tuote löytyy - newTemplateOfOrder.findIndex(index => index.id === id )

    let orderIdcheck = newTemplatePrices.findIndex(index => index.id === restaurantID)    // restaurant Id Pricelistiltä

    if(newTemplateOfOrder.findIndex(index => index.id === id) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id && index.restaurantId === restaurantID)
        newTemplateOfOrder[idcheck].quantity -= 1
        tempResId = newTemplateOfOrder.findIndex(index => index.id === id )
        newTemplatePrices[orderIdcheck].price -= newTemplateOfOrder[tempResId].price;

        if(newTemplateOfOrder[idcheck].quantity === 0){
          newTemplateOfOrder.splice(idcheck,1)
        }
        actionDone = true;
      }

    this.setState({
      tempOrder:newTemplateOfOrder,
      orderPrices:newTemplatePrices
    })

  }

  makeOrder = (index, customerId,restaurantId,restaurantName,customerName,address,postnumber,totalCost, productsOrdered, prepareTime, deliveryTime) => {
    
    let copyOfOrders = [...this.state.orders]

    
    var indexid = Math.max.apply(Math, copyOfOrders.map(function(o) { return o.id; }))

    console.log(indexid)
    if(copyOfOrders.length <= 0){
       indexid = 1;
     }
    else{
       indexid = index
    }

    

    copyOfOrders.push({
      id: indexid,
      customerId: customerId,
      restaurantId: restaurantId,
      restaurantName:restaurantName,
      customerName: customerName,
      address: address,
      postNumber: postnumber,
      totalCost: totalCost,
      orderPlacedAt:new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      orderPreparedAt:null,
      orderReadyToDispatchAt:null,
      orderDispatchedAt:null,
      orderDeliveredAt:null,
      orderDoneAt:null,
      productsOrdered: productsOrdered,
      prepareTime: prepareTime,
      deliveryTime: deliveryTime,
      orderStatus: "PLACED"  
    })

    this.setState({orders:copyOfOrders})
  }

  clearOrderFromTempOrder = (rId) => {
    let newTemplateOfOrder = [...this.state.tempOrder]
    let secondTemplateOfOrder = []
    let newTemplateOfPrices = [...this.state.orderPrices]
    let secondTemplateOfPrices = []
    
    for(var i in newTemplateOfOrder){
      if(newTemplateOfOrder[i].restaurantId !== rId){
        secondTemplateOfOrder.push(newTemplateOfOrder[i])
      }
    }

    for(var idx in newTemplateOfPrices){
      if(newTemplateOfPrices[idx].id !== rId){
        secondTemplateOfPrices.push(newTemplateOfPrices[idx])
      }
    }
    
    this.setState({tempOrder:secondTemplateOfOrder,
    orderPrices:secondTemplateOfPrices})
  }

  priceSaver = (id,price) => { 
    let copyOfPrices = [...this.state.orderPrices]

    var actionDone = false
    let idcheck
    
    if(!copyOfPrices.findIndex(index => index.id === id) && actionDone === false)
      {
        idcheck = copyOfPrices.findIndex(index => index.id === id)
        copyOfPrices[idcheck].price += price
        actionDone = true;
      }

    if(!copyOfPrices.findIndex(index => index.id === id) === false && copyOfPrices.findIndex(index => index.id === id) === -1 && actionDone === false)
      {
        copyOfPrices.push({"id":id,"price":price})
        actionDone = true;
      }
    if(copyOfPrices.findIndex(index => index.id === id) >=0 && actionDone === false)
      {
        idcheck = copyOfPrices.findIndex(index => index.id === id)
        copyOfPrices[idcheck].price += price
        actionDone = true;
      }

    this.setState({orderPrices:copyOfPrices})
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
          user = { this.state.user }
          orders={this.state.orders} 
          overviewId={this.state.overviewId}
          tempOrder = {this.state.tempOrder}
          orderPrices = {this.state.orderPrices}
          defaultScroll = {this.state.defaultScroll}
          role = {this.state.role}
          
          searchResultsActive = {this.state.searchResultsActive}
          editUserActive = { this.state.editUserActive }
          registerUserActive = { this.state.registerUserActive }
          editRestaurantActive = { this.state.editRestaurantActive }
          editRestaurantMenuActive = { this.state.editRestaurantMenuActive }
          managerOrderHistoryActive = { this.state.managerOrderHistoryActive }
          customerOrderHistoryActive= {this.state.customerOrderHistoryActive}
          orderviewActive = { this.state.orderviewActive}
          createRestaurant = { this.state.createRestaurant}
          productSearchString = { this.state.productSearchString}
          orderPreviewActive = { this.state.orderPreviewActive }

          defaultScrollActivate={this.defaultScrollActivate}
          reduceFromOrder={this.reduceFromOrder}
          deleteItem ={ this.deleteItem }
          addToOrder ={ this.addToOrder }
          addNewRestaurant={ this.addNewRestaurant}
          defaultActivate={ this.defaultActivate}
          makeOrder={ this.makeOrder}
          clearOrderFromTempOrder={ this.clearOrderFromTempOrder }
        />

        <SideBar
          orders = { this.state.orders }
          user = { this.state.user }
          restaurant = {this.state.restaurant}
          tempOrder = {this.state.tempOrder}
          orderPrices = {this.state.orderPrices}
          actionString = {this.state.actionString}
          role = {this.state.role}
          shoppingCartQuickviewActive= {this.state.shoppingCartQuickviewActive}
          editRestaurantMenuQuickviewActive= {this.state.editRestaurantMenuQuickviewActive }
          managerOrderHistoryActive= {this.state.managerOrderHistoryActive}
          customerOrderHistoryActive= {this.state.customerOrderHistoryActive}
          orderPreviewActive= {this.state.orderPreviewActive}
          addNewMenuItem={this.addNewMenuItem}
          overviewChange={this.overviewChange}
          confirmOrder={this.confirmOrder}
          reduceFromOrder={this.reduceFromOrder}
          previewOrderActivate={this.previewOrderActivate}
          
        />
      </div>
      : 
        <ManagerView 
          moveToPreparation={ this.moveToPreparation } 
          setToDispatched = { this.setToDispatched } 
          products= { this.state.products } 
          orders= { this.state.orders }
          user= { this.state.user }
          restaurant = {this.state.restaurant}/>
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
          customerOrderHistoryviewActivate = {this.customerOrderHistoryviewActivate}
          />
          {/* {()=> {this.renderSwitch()}} */}

          
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
                      orderPreviewActive:false,
                      managerModeActive: false,
                      customerBarActive: true ,
                      sideBarActive: true,
                      shoppingCartQuickviewActive: true,
                      customerEditBarActive: false,
                      customerOrderHistoryActive: false,  
                      searchResultsActive: true,
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
                      // customerModeActive: false,
                      customerBarActive: false,
                      defaultBarWithoutSearchActive: false,
                      customerEditBarActive: true,
                      // userBarWithoutSearchActive: true,
                      containerActive: true,
                      shoppingCartQuickviewActive: false, 
                      orderPreviewActive:false,
                      
                      managerOrderHistoryActive: false,
                      customerOrderHistoryActive: true,

                      searchResultsActive: false,
                      managerBarActive: false,
                      actionDone:true

                      ,orderviewActive:true
                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }

                case "ORDERPREVIEW":
                  if(this.state.actionDone === false){
                    return this.setState({
                      orderPreviewActive:true,
                      defaultUserBarActive: false,
                      defaultModeActive: false,
                      
                      customerBarActive: false,
                      defaultBarWithoutSearchActive: false,
                      customerEditBarActive: true,
                      managerOrderHistoryActive: false,
                      customerOrderHistoryActive: false,
                      
                      
                      containerActive: true,
                      shoppingCartQuickviewActive: false,

                      searchResultsActive: false,
                      managerBarActive: false,
                      actionDone:true

                      ,orderviewActive:false
                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                    });
                  }


                case "EDITCUSTOMER":
                  if(this.state.actionDone === false){
                    return this.setState({
                    customerOrderHistoryActive: false,
                    orderPreviewActive:false,

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
                      customerEditBarActive: false,
                      customerOrderHistoryActive: false, 
                      searchResultsActive: true,
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
                      customerOrderHistoryActive: false,
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
                      customerOrderHistoryActive: false,
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
                      customerOrderHistoryActive: false,
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
                      customerOrderHistoryActive: false,
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
                      customerOrderHistoryActive: false,
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
                      customerOrderHistoryActive: false,
                      managerOrderHistoryActive: false,
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
                      defaultBarWithoutSearchActive: false,
                      shoppingCartQuickviewActive: true, 
                      searchResultsActive: true,
                      customerEditBarActive: false,
                      orderPreviewActive:false,
                      customerOrderHistoryActive: false,
                      managerOrderHistoryActive: false, 
                      actionDone:true

                      ,orderviewActive:false
                      ,createRestaurant: false
                      ,editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false
                      });
                  }

                  case "ORDERPREVIEW":
                  if(this.state.actionDone === false){
                    return this.setState({
                      orderPreviewActive:true,
                      defaultUserBarActive: false,
                      defaultModeActive: true,  // TÄMÄ MUUTETTU
                      
                      customerBarActive: false,
                      defaultBarWithoutSearchActive: true,
                      
                      containerActive: true,
                      shoppingCartQuickviewActive: false,

                      managerOrderHistoryActive: false,
                      customerOrderHistoryActive: false,

                      searchResultsActive: false,
                      managerBarActive: false,
                      actionDone:true

                      ,orderviewActive: false // TÄMÄ MUUTETTU
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
                      actionDone:true,
                      customerEditBarActive: false 

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
