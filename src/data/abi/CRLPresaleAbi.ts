export default [{inputs:[{internalType:"address",name:"_CRL",type:"address"},{internalType:"uint256",name:"_CRL_DECIMALS",type:"uint256"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:true,internalType:"bytes32",name:"previousAdminRole",type:"bytes32"},{indexed:true,internalType:"bytes32",name:"newAdminRole",type:"bytes32"}],name:"RoleAdminChanged",type:"event"},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:true,internalType:"address",name:"account",type:"address"},{indexed:true,internalType:"address",name:"sender",type:"address"}],name:"RoleGranted",type:"event"},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:true,internalType:"address",name:"account",type:"address"},{indexed:true,internalType:"address",name:"sender",type:"address"}],name:"RoleRevoked",type:"event"},{inputs:[],name:"CRL",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"DEFAULT_ADMIN_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"PAYMENT_METHODS",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"SIGNER_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[],name:"SOFT_CAP",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"}],name:"addPaymentMethod",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"amounts",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"tokenToPay",type:"address"},{internalType:"uint256",name:"amountToPay",type:"uint256"},{internalType:"uint256",name:"amountToReceive",type:"uint256"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"bytes",name:"signature",type:"bytes"}],name:"buy",outputs:[],stateMutability:"payable",type:"function"},{inputs:[],name:"endTime",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"}],name:"getRoleAdmin",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"}],name:"getToken",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"grantRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"hasRole",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"toIncrease",type:"uint256"}],name:"increaseEndTime",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"paymentMethodsLength",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"price",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"redeem",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"refund",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"renounceRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"revokeRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_price",type:"uint256"}],name:"setPrice",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"start",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"tokenSold",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}];