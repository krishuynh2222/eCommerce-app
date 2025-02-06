import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        //creates a deep copy of the current 'cartItems' state,
        //stored in 'cartData'
        let cartData = structuredClone(cartItems);

        //it shows ERROR notify when user dont select size
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        //If 'itemId exists in 'cartData'
        if (cartData[itemId]) {
            //if [itemId][size] exists
            if (cartData[itemId][size]) {
                //increments the quantity if the SIZE exists
                cartData[itemId][size] += 1;
            } else {
                //if not, it initializes it to 1
                cartData[itemId][size] = 1;
            }
        } else { //If 'itemId' doesnot exist, 
            //initializes a new object for it
            cartData[itemId] = {};
            //sets the quantity for the given size to 1
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData); //Updates the cartItems state w the modified cartData
        
         // Sending a POST request to the backend to add an item to the user's cart
        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/add',
                    {itemId, size}, // Request body containing the itemId and size of the product
                    {headers: {token}}); // Setting the headers to include the token for authorization
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    
    }

    
    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) { //iterate the items
            for (const item in cartItems[items]) { //iterate the product size
                try {
                    if (cartItems[items][item] > 0) {  // Check if the quantity is greater than 0
                        totalCount += cartItems[items][item];// Add the quantity to the total count
                    }
                } catch (error) {
                   
                }
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems); //Create a deep copy of cartItems

        cartData[itemId][size] = quantity; //Update the quantity for the specific item and size

        setCartItems(cartData); //Update the state with new cart data

        // Sending a POST request to the backend to update an item 
        if(token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/update',
                    {itemId, size, quantity}, // Request body containing the itemId/size/quantity of the product
                    {headers: {token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    //=========== Calculates the total value of the items in the cart =========== 
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) { //iterate each item in 'cartItems'
            let itemInfo = products.find((product) => product._id === items); //finds the corresponding product in the products array using _id
            for (const item in cartItems[items]) { //iterate each size of the current item in 'cartItems'
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


     //Function to get product data
     const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + "/api/product/list");
            
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Sends a POST request to the backend to retrieve the user's cart data
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}});
             // Checks if the response indicates success
            if (response.data.success) {
                setCartItems(response.data.cartData);  // If successful, update the cart state with the received data
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, []);


    // useEffect(() => {
    //     //if token is not available and there is a token stored in the browser
    //     if (!token  && localStorage.getItem('token')) {
    //         //it will call setToken() with the value retrieved from localStorage
    //         setToken(localStorage.getItem('token'));
    //          // Call getUserCart to load the cart data
    //         getUserCart();
    //     }
    // }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);  // Pass the token to fetch the cart
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;