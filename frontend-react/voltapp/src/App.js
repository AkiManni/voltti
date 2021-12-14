import React from 'react';
import './App.css';
import orders from './orders.json';
import tempOrder from './tempOrder.json';
import ManagerView from './components/ManagerView';
import MenuBar from './components/MenuBar';
import ContentContainer from './components/ContentContainer';
import SideBar from './components/SideBar';
import data from './data.json'
import axios from 'axios';
import Cookies from 'js-cookie';
import authToken from "./utils/authToken";

import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Navibar from "./components/User/Navibar";
import Register from "./components/User/Register";
import Home from './components/Home';
class App extends React.Component {
  constructor(props)
  {
   
    super(props);
    this.state = {
      orders: orders.orders, // voi kai korvata [] - katsotaan huomenna
      tempOrder: tempOrder.order,
      items: data.items,  // voi kai korvata [] - katsotaan huomenna

      managerModeActive:false,
      defaultUserModeActive: true,
      customerModeActive: false,
      loginActive: false,

      productSearchString: "",
      ordersClear:[],
      orderPrices:[],
      actionDone:false,
      role:"",
      actionString:"MAIN",
      intervalId:"",
      overviewId:"",
      Useri:{
        username:"",
        Restaurant:{},
        Role:""
      },
      user: {},
      restaurant: {},
      Restaurant:{},
      defaultScroll: false,
      isLogged: false,

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

  }) }

  managerActivate = () => {  this.setState( {actionDone:false, role:"MANAGER", actionString:"MAIN"})}

  getRestaurantBalance = () => {
    
    return this.state.Useri.Restaurant.restaurantBalance;
    //this.setState({restaurantBalance: sum})
  }
  
  managerOrderOverviewActivate = () => {this.setState( {actionDone:false, actionString:"ORDERS", orderviewActive:false, managerOrderHistoryActive:false })}

  managerOrderHistoryActivate = () => {this.setState( {actionDone:false, actionString:"ORDERHISTORY"})}

  customerEditInfoActivate = () => {this.setState( {actionDone:false, actionString:"EDITCUSTOMER"})}

  defaultActivate = () => { this.setState( {actionDone:false, role:"", actionString:"MAIN", overviewId:"", 
  orderviewActive:false, managerOrderHistoryActive:false, createRestaurantActive: false, user: {userId: null,
    firstName: null,
    surName: null,
    address: null,
    postNumber: null,
    isManager: false} }) } 

  createRestaurantActive = () => { this.setState( {actionDone:false, role:"MANAGER", createRestaurant: true, editRestaurantActive: false, actionString:"EDITCREATERESTAURANT"})}

  editRestaurantMenuActive = () => { this.setState( {actionDone:false, role:"MANAGER",actionString:"EDITCREATERESTAURANTMENU"})}

  editRestaurantInfoActivate = () => { this.setState({actionDone:false, createRestaurant: false, editRestaurantActive: true, actionString:"EDITCREATERESTAURANT"})}

  customerOrderHistoryviewActivate = () => { this.setState( {actionDone:false, role:"CUSTOMER", actionString:"ORDERHISTORY"})}


  previewOrderActivate = () => { this.setState( {actionDone:false, actionString:"ORDERPREVIEW", defaultScroll:true}); 
  }

  dataUpdater = () => {
        
        axios({      
          method:'GET',
          url:'https://voltti.herokuapp.com/bolt/getProduct'}) 
          .then(res => {
            this.setState({items:res.data})
          
        })
        
        if(this.state.user.role === "MANAGER"){
          axios({
            method:'GET',
            url:'https://voltti.herokuapp.com/bolt/getOrdersByRestaurantID/{id}',
            params: {id: this.state.user.restaurantID}     // EN TIEDÄ ONKO OK - KORJATAAN.
          }).then(function(res){
            this.setState({orders:res.data})
          });    
        }
        
        if(this.state.user.role === "CUSTOMER"){
          axios({
            method:'GET',
            url:'https://voltti.herokuapp.com/bolt/getOrderByUserID/{id}',
            params: {id: this.state.user.userID}
          }).then(function(res){
            this.setState({orders:res.data})
          });  
        }

        if (Cookies.get('jwtToken')) {
          //  console.log("käyttäjä on vielä tunnistautunut jwttokenilla " + Cookies.get('jwtToken'));
          authToken(Cookies.get('jwtToken'));

          if(Cookies.get('jwtToken')){
            if(this.state.Useri.username === "" && this.state.isLogged === false){


              this.setState(
                {
                  Useri:{
                    username:Cookies.get('username'),
                    Role:Cookies.get('Role'),
                    Restaurant:{}
                  },
                  role:Cookies.get('Role'),
                  actionString:"MAIN"
              });
              
              if(this.state.role === "MANAGER"){
                this.managerActivate()
              }
              else{
                this.customerActivate()
              }
            
            }
            else{
              console.log(this.state.Useri)
              console.log(Cookies.get('jwtToken'))
              console.log(Cookies.get('username'))
              console.log(Cookies.get('Role'))
              
              console.log(this.state.role)
              
            }
          }
          }

  }

  componentDidMount(){
      this.setState({intervalId: setInterval(() => {
        this.dataUpdater()
      }, 1000)})
  }

  componentWillUnmount(){ clearInterval(this.state.intervalId)
  }

  onSearchFieldChange = (event) => {
      console.log('Keyboard event');
      console.log(event.target.value);
      this.setState({ productSearchString: event.target.value });
  }


  confirmOrder = (orderID) => {

    axios({
      method: 'get',
      url: 'https://voltti.herokuapp.com/bolt/updateOrder/{id}',
      params: {id: orderID}
    });
        
  }

  overviewChange = id => { 
    this.setState({overviewId: id, orderviewActive:true})
  }

  addToOrder = (productID,restaurantID,restaurantName,foodName,photoPath,price,prepareTime) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    var actionDone = false
    let idcheck

    this.priceSaver(restaurantID,price);
    
    if(!newTemplateOfOrder.findIndex(index => index.id === productID) && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === productID)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    if(!newTemplateOfOrder.findIndex(index => index.productID === productID) === false && newTemplateOfOrder.findIndex(index => index.productID === productID) === -1 && actionDone === false)
      {
        newTemplateOfOrder.push({"productID":productID,"restaurantId":restaurantID,"restaurantName":restaurantName,"foodName":foodName,"photoPath":photoPath,"price":price,"prepareTime":prepareTime, "quantity":1})
        actionDone = true;
      }
    if(newTemplateOfOrder.findIndex(index => index.productID === productID) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.productID === productID)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    this.setState({tempOrder:newTemplateOfOrder})
  }

  reduceFromOrder = (productID, restaurantID) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    let newTemplatePrices = [...this.state.orderPrices]
    var actionDone = false
    let idcheck // muuttuja TemplateOrdersin indexille, josta vähennetään tuote - newTemplateOfOrder[idcheck].quantity -=
    let tempResId // muuttuja TemplateOrdersin indexille, josta tuote löytyy - newTemplateOfOrder.findIndex(index => index.id === id )

    let orderIdcheck = newTemplatePrices.findIndex(index => index.id === restaurantID)    // restaurant Id Pricelistiltä

    if(newTemplateOfOrder.findIndex(index => index.productID === productID) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.productID === productID && index.restaurantId === restaurantID)
        newTemplateOfOrder[idcheck].quantity -= 1
        tempResId = newTemplateOfOrder.findIndex(index => index.productID === productID )
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

  loginActivate = () =>  { 
    this.setState({loginActive:!this.state.loginActive})
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
          Restaurant = { this.state.restaurant}
          Useri = { this.state.user }
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
          addToOrder ={ this.addToOrder }
          editRestaurant={this.editRestaurant}
          defaultActivate={ this.defaultActivate}
          clearOrderFromTempOrder={ this.clearOrderFromTempOrder }
          getRestaurantBalance = {this.getRestaurantBalance}
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
          editUserActive = {this.state.editUserActive}
          overviewChange={this.overviewChange}
          reduceFromOrder={this.reduceFromOrder}
          previewOrderActivate={this.previewOrderActivate}
          getRestaurantBalance = {this.getRestaurantBalance}
          
        />
      </div>
      : 
        <ManagerView 
          orders= { this.state.orders }
          user= { this.state.user }
          restaurant = {this.state.restaurant}
          getRestaurantBalance = {this.getRestaurantBalance}/>
          
          }
    </div>
    </>

    let loginBar = 
    <>
    <div>
    
      <Router>

 
      <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/home" exact component={Home} />
    
        </Switch>


      </Router>
      

    </div>
    </>

    let output = 
      <>
        <div>
          <MenuBar
          Useri = {this.state.Useri}
          Restaurant = {this.state.Useri.Restaurant}
          restaurant = {this.state.restaurant}
          menuBarActive={this.state.menuBarActive}
          defaultUserBarActive={this.state.defaultUserBarActive}
          defaultBarWithoutSearchActive={this.state.defaultBarWithoutSearchActive}
          customerBarActive={this.state.customerBarActive}
          customerEditBarActive={this.state.customerEditBarActive}
          userBarWithoutSearchActive={this.state.userBarWithoutSearchActive}
          managerBarActive={this.state.managerBarActive}
          managerEditBarActive={this.state.managerEditBarActive}
          onSearchFieldChange={this.onSearchFieldChange}
          getRestaurantBalance={this.getRestaurantBalance}

          createRestaurantActive={this.createRestaurantActive}
          managerActivate={this.managerActivate}
          customerActivate={this.customerActivate}
          editRestaurantInfoActivate={this.editRestaurantInfoActivate}
          
          defaultActivate={this.defaultActivate}
          managerOrderOverviewActivate={ this.managerOrderOverviewActivate }
          managerOrderHistoryActivate={ this.managerOrderHistoryActivate}
          editRestaurantMenuActive = {this.editRestaurantMenuActive}
          customerEditInfoActivate = {this.customerEditInfoActivate}
          customerOrderHistoryviewActivate = {this.customerOrderHistoryviewActivate}
          loginActivate = {this.loginActivate}
          />
          

          {this.state.loginActive?  <div>{loginBar}</div> : <></>}

          <div className="wrapper">
          { elementContainer }
          </div>
        </div>
      </>




    
  return (



    <>

      {(() => {

      // PITÄÄ MIETTIÄ JWT:N JA PALAUTETUN USER DATAN KANSSA TOIMIMAAN:
        switch(this.state.Useri.Role){
          case "CUSTOMER":
              switch(this.state.actionString){
                case "MAIN":
                  if(this.state.actionDone === false){
                    return this.setState({
                      defaultUserModeActive: false, 
                      defaultUserBarActive: false,
                      defaultUserBarWithoutSearchBar: false,
                      orderPreviewActive:false,
                      customerBarActive: true ,
                      sideBarActive: true,
                      shoppingCartQuickviewActive: true,
                      customerEditBarActive: false,
                      customerOrderHistoryActive: false,  
                      searchResultsActive: true, 
                      editUserActive:false,
                      orderviewActive:false,
                      actionDone:true
                    });
                }
                case "ORDERHISTORY":
                  if(this.state.actionDone === false){
                    return this.setState({
                      customerBarActive: false,
                      customerEditBarActive: true,
                      containerActive: true,
                      shoppingCartQuickviewActive: false, 
                      orderPreviewActive:false, 
                      customerOrderHistoryActive: true,
                      searchResultsActive: false,
                      actionDone:true
                      ,orderviewActive:true
                      ,editUserActive:false
                    });
                  }

                case "ORDERPREVIEW":
                  if(this.state.actionDone === false){
                    return this.setState({
                      orderPreviewActive:true,
                      customerBarActive: false,
                      defaultBarWithoutSearchActive: false,
                      customerEditBarActive: true,
                      customerOrderHistoryActive: false,
                      containerActive: true,
                      shoppingCartQuickviewActive: false,
                      searchResultsActive: false,
                      orderviewActive:false,
                      editUserActive:false,
                      actionDone:true
                    });
                  }


                case "EDITCUSTOMER":
                  if(this.state.actionDone === false){
                    return this.setState({
                    customerOrderHistoryActive: false,
                    orderPreviewActive:false,
                    editUserActive:true,
                    containerActive: true,
                    shoppingCartQuickviewActive: false, 
                    customerEditBarActive: true,
                    customerBarActive: false,
                    searchResultsActive: false,
                    orderviewActive:false,
                    actionDone:true,
                    });
                  }
                default:
                  if(this.state.actionDone === false){
                    return this.setState({
                      defaultUserModeActive: false, 
                      defaultUserBarActive: false,
                      defaultUserBarWithoutSearchBar: false,
                      customerBarActive: true ,
                      sideBarActive: true,
                      shoppingCartQuickviewActive: true,
                      customerEditBarActive: false,
                      customerOrderHistoryActive: false, 
                      searchResultsActive: true,
                      orderviewActive:false,
                      editUserActive:false,
                      actionDone:true
                    });
                }

              }
            
          case "MANAGER":
              switch(this.state.actionString){
                case "MAIN":
                  if(this.state.actionDone === false){
                  return this.setState({
                      defaultUserBarActive: false,
                      defaultBarWithoutSearchActive: false,
                      containerActive: false,
                      managerBarActive: true,    
                      orderviewActive:false,
                      createRestaurant: false,
                      editRestaurantActive: false,
                      editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
                  });
                }
                case "ORDERS":
                  if(this.state.actionDone === false){
                    return this.setState({
                      containerActive: false,
                      managerBarActive: true,
                      orderviewActive:false,
                      createRestaurant: false,
                      editRestaurantActive: false,
                      editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
                    });
                  }

                case "ORDERHISTORY":
                  if(this.state.actionDone === false){
                    return this.setState({
                      containerActive: true,
                      shoppingCartQuickviewActive: false, 
                      managerOrderHistoryActive: true,
                      searchResultsActive: false,
                      managerBarActive: true,
                      orderviewActive:true,
                      createRestaurant: false,
                      editRestaurantActive: false,
                      editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
                    });
                  }

                case "EDITCREATERESTAURANT":
                  if(this.state.actionDone === false){
                    return this.setState({
                      containerActive: true,
                      shoppingCartQuickviewActive: false, 
                      managerOrderHistoryActive: false,
                      searchResultsActive: false,
                      managerBarActive: true,
                      orderviewActive:false,
                      editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
                    });
                  }

                case "EDITCREATERESTAURANTMENU":
                  if(this.state.actionDone === false){
                    return this.setState({
                      containerActive: true,
                      shoppingCartQuickviewActive: false, 
                      managerOrderHistoryActive: false,
                      searchResultsActive: false,
                      managerBarActive: true,
                      orderviewActive:false,
                      editRestaurantMenuActive:true,
                      editRestaurantActive: false,
                      editRestaurantMenuQuickviewActive: true,
                      createRestaurant: false,
                      actionDone:true
                    });
                  }
                default:
                  if(this.state.actionDone === false){
                    return this.setState({
                      managerOrderHistoryActive: false,
                      containerActive: false,
                      managerBarActive: true,
                      orderviewActive:false,
                      createRestaurant: false,
                      editRestaurantMenuActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      editRestaurantActive: false,
                      actionDone:true
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
                      userBarWithoutSearchActive: false,
                      orderviewActive:false,
                      createRestaurant: false,
                      editRestaurantActive: false,
                      editRestaurantMenuActive:false,
                      editUserActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
                      });
                  }

                  case "ORDERPREVIEW":
                  if(this.state.actionDone === false){
                    return this.setState({
                      orderPreviewActive:true,
                      defaultUserBarActive: false,
                      defaultBarWithoutSearchActive: true,
                      containerActive: true,
                      shoppingCartQuickviewActive: false,
                      searchResultsActive: false,
                      orderviewActive: false,
                      actionDone:true

                    });
                  }
                  
                case "LOGIN":
                  if(this.state.actionDone === false){
                    return this.setState({
                      actionDone:true
                      });
                  }

                case "REGISTER":
                  if(this.state.actionDone === false){
                    return this.setState({
                      actionDone:true
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
                      defaultBarWithoutSearchActive: false,
                      shoppingCartQuickviewActive: true, 
                      searchResultsActive: true,
                      customerEditBarActive: false,
                      orderPreviewActive:false,
                      customerOrderHistoryActive: false,
                      managerOrderHistoryActive: false,
                      userBarWithoutSearchActive: false,
                      orderviewActive:false,
                      createRestaurant: false,
                      editRestaurantActive: false,
                      editRestaurantMenuActive:false,
                      editUserActive:false,
                      editRestaurantMenuQuickviewActive: false,
                      actionDone:true
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
