import {Fragment, useState }from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function Cart({cartItems, setCartitems}){
    const [complete,setComplete] = useState(false);
    function increaseQty(item){

        if (item.qty != item.product.stock && item.qty <= item.product.stock) {
           
            const updateditems =cartItems.map((i)=>{
                if(i.product._id==item.product._id){
                    i.qty++
                }
                return i;
            })
            setCartitems(updateditems);
        }
    }

    function decreaseQty(item){
        if(item.qty>1){
            if (item.qty != item.product.stock && item.qty <= item.product.stock) {
           
            const updateditems =cartItems.map((i)=>{
                if(i.product._id==item.product._id){
                    i.qty--
                }
                return i;
            })
            setCartitems(updateditems)
            }
        }
    }

    function removeItem(item){
        const updateditems =cartItems.filter((i)=>{
            if(i.product._id !== item.product._id){
               return true;
            }
            
        })
        setCartitems(updateditems);
    }
    function placeOrderHandler(){
        fetch(process.env.REACT_APP_API_URL+'/order/',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(cartItems)
        })
        .then(()=>{
            setCartitems([]);
            setComplete(true);
            toast.success('Order Success')
        })
    }

    return cartItems.length >0 ?<Fragment>
                <div class="container container-fluid">
                    <h2 class="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
                    <div class="row d-flex justify-content-between">
                
                        <div class="col-12 col-lg-8">
                            {cartItems.map((item)=> (                  
                            <Fragment>                  
                                <hr />
                                <div class="cart-item">
                                    <div class="row">
                                        <div class="col-4 col-lg-3">
                                            < img src={item.product.images[0].image} alt={item.product.name} height="90" width="115"/>
                                        </div>

                                        <div class="col-5 col-lg-3">
                                            <Link to={'/product/'+item.product._id}>{item.product.name}</Link>
                                        </div>


                                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${item.product.price}</p>
                                        </div>

                                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div class="stockCounter d-inline">
                                                <span onClick={()=>decreaseQty(item)} class="btn btn-danger minus">-</span>
                                                <input type="number" class="form-control count d-inline" value={item.qty} readOnly />

                                                <span onClick={()=>increaseQty(item)} class="btn btn-primary plus">+</span>
                                            </div>
                                        </div>

                                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=>removeItem(item)}></i>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                            ))}
                        </div>

                        <div class="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                                <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item)=>(acc+item.product.price * item.qty),0)}</span></p>

                                <hr />
                                <button id="checkout_btn" class="btn btn-primary btn-block" onClick={placeOrderHandler}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>:(!complete ? <h2 className='mt-5'>Your Cart is Empty</h2> : 
                        <Fragment >
                            <h2 className='mt-5'>Order completed</h2>
                            <p>Your order has been placed Successfully</p>
                        </Fragment>)
}