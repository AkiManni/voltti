import React from 'react';



export default function Controller(props){

    const changeState = (truthVariable,trueFalse) => {
        props.changeState(truthVariable,trueFalse);
    }


    {(() => {

          switch(props.role){
            case "CUSTOMER":
                switch(props.actionString){
                  case "MAIN":
                    if(props.actionDone === false){
                        changeState("defaultUserModeActive",false)
                        changeState("defaultUserBarActive",false)
                        changeState("defaultUserBarWithoutSearchBar",false)
                        changeState("orderPreviewActive",false)
                        changeState("customerBarActive",true)
                        changeState("sideBarActive",true)
                        changeState("shoppingCartQuickviewActive",true)
                        changeState("customerEditBarActive",false)
                        changeState("customerOrderHistoryActive",false) 
                        changeState("searchResultsActive",true) 
                        changeState("editUserActive",false)
                        changeState("orderviewActive",false)
                        changeState("actionDone",true)
                      
                  }
                  case "ORDERHISTORY":
                    if(props.actionDone === false){
                        changeState("customerBarActive",false)
                        changeState("customerEditBarActive",true)
                        changeState("containerActive",true)
                        changeState("shoppingCartQuickviewActive",false) 
                        changeState("orderPreviewActive",false) 
                        changeState("customerOrderHistoryActive",true)
                        changeState("searchResultsActive",false)
                        changeState("actionDone",true)
                        changeState("orderviewActive",true)
                        changeState("editUserActive",false)
                    }
  
                  case "ORDERPREVIEW":
                    if(props.actionDone === false){
                        changeState("orderPreviewActive",true)
                        changeState("customerBarActive",false)
                        changeState("defaultBarWithoutSearchActive",false)
                        changeState("customerEditBarActive",true) 
                        changeState("customerOrderHistoryActive",false)
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false)
                        changeState("searchResultsActive",false)
                        changeState("orderviewActive",false)
                        changeState("editUserActive",false)
                        changeState("actionDone",true) 
                    }
  
  
                  case "EDITCUSTOMER":
                    if(props.actionDone === false){
                        changeState("customerOrderHistoryActive",false)
                        changeState("orderPreviewActive",false)
                        changeState("editUserActive",true)
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false) 
                        changeState("customerEditBarActive",true) 
                        changeState("customerBarActive",false)
                        changeState("searchResultsActive",false)
                        changeState("orderviewActive",false)
                        changeState("actionDone",true)
                    }
                  default:
                    if(props.actionDone === false){
                        changeState("defaultUserModeActive",false)
                        changeState("defaultUserBarActive",false)
                        changeState("defaultUserBarWithoutSearchBar",false)
                        changeState("orderPreviewActive",false)
                        changeState("customerBarActive",true)
                        changeState("sideBarActive",true)
                        changeState("shoppingCartQuickviewActive",true)
                        changeState("customerEditBarActive",false)
                        changeState("customerOrderHistoryActive",false) 
                        changeState("searchResultsActive",true) 
                        changeState("editUserActive",false)
                        changeState("orderviewActive",false)
                        changeState("actionDone",true)
                  }
                }
              
            case "MANAGER":
                switch(props.actionString){
                  case "MAIN":
                    if(props.actionDone === false){
                        changeState("defaultUserBarActive",false)
                        changeState("defaultBarWithoutSearchActive",false)
                        changeState("containerActive",false)
                        changeState("managerBarActive",true)     
                        changeState("orderviewActive",false)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                  }
                  case "ORDERS":
                    if(props.actionDone === false){
                        changeState("containerActive",false)
                        changeState("managerBarActive",true) 
                        changeState("orderviewActive",false)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                    }
  
                  case "ORDERHISTORY":
                    if(props.actionDone === false){
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false) 
                        changeState("managerOrderHistoryActive",true) 
                        changeState("searchResultsActive",false)
                        changeState("managerBarActive",true)
                        changeState("orderviewActive",true)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                    }
  
                  case "EDITCREATERESTAURANT":
                    if(props.actionDone === false){
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false) 
                        changeState("managerOrderHistoryActive",false)
                        changeState("searchResultsActive",false)
                        changeState("managerBarActive",true) 
                        changeState("orderviewActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                    }
  
                  case "EDITCREATERESTAURANTMENU":
                    if(props.actionDone === false){
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false) 
                        changeState("managerOrderHistoryActive",false)
                        changeState("searchResultsActive",false)
                        changeState("managerBarActive",true) 
                        changeState("orderviewActive",false)
                        changeState("editRestaurantMenuActive",true)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuQuickviewActive",true) 
                        changeState("createRestaurant",false)
                        changeState("actionDone",true) 
                    }
                  default:
                    if(props.actionDone === false){
                        changeState("defaultUserBarActive",false)
                        changeState("defaultBarWithoutSearchActive",false)
                        changeState("containerActive",false)
                        changeState("managerBarActive",true)     
                        changeState("orderviewActive",false)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                    }
                }
            default:
                switch(props.actionString){
                  case "MAIN":
                    if(props.actionDone === false){
                        changeState("customerModeActive",false)
                        changeState("managerModeActive",false)
                        changeState("managerBarActive",false)
                        changeState("customerBarActive",false)
                        changeState("sideBarActive",true) 
                        changeState("containerActive",true) 
                        changeState("defaultUserBarActive",true) 
                        changeState("defaultBarWithoutSearchActive",false)
                        changeState("shoppingCartQuickviewActive",true)  
                        changeState("searchResultsActive",true) 
                        changeState("customerEditBarActive",false)
                        changeState("orderPreviewActive",false)
                        changeState("customerOrderHistoryActive",false)
                        changeState("managerOrderHistoryActive",false)
                        changeState("userBarWithoutSearchActive",false)
                        changeState("orderviewActive",false)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editUserActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                    }
  
                    case "ORDERPREVIEW":
                    if(props.actionDone === false){
                        changeState("orderPreviewActive",true)
                        changeState("defaultUserBarActive",false)
                        changeState("defaultBarWithoutSearchActive",true) 
                        changeState("containerActive",true) 
                        changeState("shoppingCartQuickviewActive",false)
                        changeState("searchResultsActive",false)
                        changeState("orderviewActive",false)
                        changeState("actionDone",true) 
                    }
                    
                  case "LOGIN":
                    if(props.actionDone === false){
                        changeState("actionDone",true) 
                    }
  
                  case "REGISTER":
                    if(props.actionDone === false){
                        changeState("actionDone",true) 
                    }

                  default:
                    if(props.actionDone === false){
                        changeState("customerModeActive",false)
                        changeState("managerModeActive",false)
                        changeState("managerBarActive",false)
                        changeState("customerBarActive",false)
                        changeState("sideBarActive",true) 
                        changeState("containerActive",true) 
                        changeState("defaultUserBarActive",true) 
                        changeState("defaultBarWithoutSearchActive",false)
                        changeState("shoppingCartQuickviewActive",true)  
                        changeState("searchResultsActive",true) 
                        changeState("customerEditBarActive",false)
                        changeState("orderPreviewActive",false)
                        changeState("customerOrderHistoryActive",false)
                        changeState("managerOrderHistoryActive",false)
                        changeState("userBarWithoutSearchActive",false)
                        changeState("orderviewActive",false)
                        changeState("createRestaurant",false)
                        changeState("editRestaurantActive",false)
                        changeState("editRestaurantMenuActive",false)
                        changeState("editUserActive",false)
                        changeState("editRestaurantMenuQuickviewActive",false)
                        changeState("actionDone",true) 
                      }
  
                }
              }
          
          
            })()}

    return(
        <div></div>
            );
}