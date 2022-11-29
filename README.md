# Development

### Link to Deployed Website
If you used the stencil code, this is https://sleepycow228.github.io/development/

### Goal and Value of the Application

The goal of this application is to simulate a site to sell/buy candles. The idea here that there are candles based on the different seasons. You are able to add to your cart by looking at the image of the candle and are able to increase or decrease the number of those in the cart. There is also a price aggregator in the cart. 

### Usability Principles Considered

I paid attentiion to the the efficiency of the app. It is easy and intuitive to add and remove items from the cart. It is also clear to see how to filter and sort items shown. I used hierarchy principles to organize the page as well.

### Organization of Components

My components are:
App
DecreaseItemCount
IncreaseItemCount
ShopItemGallery
ShopItemCart

App is the main component on my page.

DecreaseItemCount and IncreaseItemCount are called within ShopItemCart

ShopItemGallery and ShopItemCart are called within App to represent the Shop Item in the Gallery and Cart respectively.

### How Data is Passed Down Through Components

Through states defined in App and through functional component arguments.

### How the User Triggers State Changes

The User triggers state changes by selecting items from the dropdowns in my makeshift navbar or by using the add to cart buttons or the increase or decease buttons in each cart item.



