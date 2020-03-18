var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "acceptREQ",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "gra",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "addgrades",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string[]",
				"name": "mssv",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "percent",
				"type": "string[]"
			}
		],
		"name": "addsv_perc",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "contructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "sendRQ",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gePP",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "getall",
		"outputs": [
			{
				"internalType": "string[200][11]",
				"name": "",
				"type": "string[200][11]"
			},
			{
				"internalType": "string[10]",
				"name": "",
				"type": "string[10]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string[]",
				"name": "classH",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "mssv",
				"type": "string"
			}
		],
		"name": "getall1sv",
		"outputs": [
			{
				"internalType": "string[10][200]",
				"name": "",
				"type": "string[10][200]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "getCF",
		"outputs": [
			{
				"internalType": "address[20]",
				"name": "",
				"type": "address[20]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "enum Class.status[]",
				"name": "",
				"type": "uint8[]"
			},
			{
				"internalType": "string[10]",
				"name": "",
				"type": "string[10]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "mssv",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "classH",
				"type": "string"
			}
		],
		"name": "getsv",
		"outputs": [
			{
				"internalType": "string[20]",
				"name": "",
				"type": "string[20]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = abi;