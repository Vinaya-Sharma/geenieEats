import { CommonActions } from "@react-navigation/native"
import { collection, getDocs} from "firebase/firestore"
import { useState } from "react"


export const postData = [
    {
        image: "https://assets.bonappetit.com/photos/610aa6ddc50e2f9f7c42f7f8/master/pass/Savage-2019-top-50-busy-restaurant.jpg",
        name: 'Baby Rest',
        address: "My home",
        ratings: 5,
        items:[{
            itemName:'soup',
            itemPrice:9,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'noodles',
            itemPrice:18,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'cake',
            itemPrice:3,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        ]
    },
    {
        image: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
        name: 'The Best wnjnqj',
        address: "rosssparkks",
        ratings: 3,
        items:[{
            itemName:'soup',
            itemPrice:9,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'noodles',
            itemPrice:18,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'cake',
            itemPrice:3,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        },   
        {
            itemName:'water',
            itemPrice:1,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        ]
    },
    {
        image: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
        name: 'The Best wnjnqj',
        address: "rosssparkks",
        ratings: 3,
        items:[{
            itemName:'soup',
            itemPrice:9,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'noodles',
            itemPrice:18,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, ]
    },
    {
        image: "https://assets.bonappetit.com/photos/610aa6ddc50e2f9f7c42f7f8/master/pass/Savage-2019-top-50-busy-restaurant.jpg",
        name: 'Baby Rest',
        address: "My home",
        ratings: 5,
        items:[{
            itemName:'soup',
            itemPrice:9,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, 
        {
            itemName:'noodles',
            itemPrice:18,
            itemDescription:'wnfjnwjfnewjnfjwenfjwenfjnfe'
        }, ]
    },
    
]

