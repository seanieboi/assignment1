#Assignment 1 - AngularJS app.

Name: Sean O'Connor

###Overview.

The purpose of this application is to demo Angulars core functions as part of a college assignment. To do this I decided to create a video game application which allows the user to view games and create an account. The reason I choose this type of web app is that I have a great interest in video games and I find alot of the online stores don't have good clean designed stores. Also I found that most Irish online game stores are very expensive and don't give the user all the information required to make their purchase. therefore my objectives of the application were to allow the user to: 

+ View latest games and prices quickly 
+ Give the user a product discription, details and trailer for the game to allow them to easily know if a game is for them or not. 
+ Comment on games so the can rest assure that not all the reviews are by people payed to review the games. 
+ Upvote comments to give more information on whether a game is worth it or not. 
+ Login or sign up to make purchases or comment on games. 
+ Have information displayed clearly no matter what kind of device the user is using. 
+ Contact Us if they find informatioon is not correct or a bug in the code.  


###User Functions.
 
 + View product details for desired game along with game trailer 
 + Sort gammes alphabetically or by release date
 + Search games by name
 + Comment on games
 + Upvote comments on games
 + Filtered games on the homepage to allow the user to see new releases
 + Carosal to show user special offers etc..
 + View App on Mobile Device
 + Full validation on contact us form to help the user not make mistakes

###Installation requirements.

+ AngularJS 1.5.2
+ Bootstrap 3.3.6
+ Sublime Text
+ Beyond Compare

###How to run App.

+ To run the app after cloning
+ Download a simple http-server 
+ Navigate to the folder where the app is downloaded
+ Open web browser
+ A link for assignment1 should be present
+ Click the link and click the link for funTimesApp
+ All required classes etc are in the package therefore no extra software etc is required to run the app. 
feel free to explore app. 
+ The only environment set up nessacary is to have a http server running to view the app

###Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][image1]

<br>

Sample json data for a game:

![][image2]

<br>

Use meaningful sample data. Briefly explain any non-trivial issues.

###App Design.

A simple diagram showing the app's component design, in particular controllers and services (see example below).

![][image3]

###UI Design.

Homepage view uses gameListCtrl controller, route is /homepage:
![][image4]

<br>

About page uses aboutCtrl, route is /route:
![][image5]

<br>

Games page uses allGamesCtrl controller, route is /games:
![][image6]

<br>

Game details page uses unique id from games page, the controller is gameDetailsCtrl, route is /games/gamesId:
![][image7]

<br>

Reviews page uses unique id from game details page, the controller is gameReviewCtrl, route is /games/gameId/reviewsgamesId:
![][image8]

<br>

Contact us page uses contactUsCtrl, the route is /contact:
![][image9]

###Routing.

+ /homepage - displays main page with carrasol and new releases (games released in 2016)
+ /about - gives details of the app 
+ /games - lists all available games and allows the user to sort them by name or release date or filter by name
+ /games/:gameId - displays details for a specific game
+ /games/:gameId/reviews - displays reviews for the selected game
+ /contact - displays a contact us form with full validation (not connected to back end)
+ /login - allows user to log in to view their account
+ /myaccount - only available after the user logs in with valid credentials
+ /register - allows user to register anfd lthen login to app
+ otherwise - redirects the user to the homepage

###Extra features

+ Authentication - users can log in to view their account, this is preformed by comparing the details entered by the user to an array acting as a database to see if credentials match and if they do then authenticate. 
+ User Registration - A user can reigster to the system and then login with their details. After registering the user is re-directed to the login page. This was simple to implement when a user registers their details are wrote to an array that simulates a Database. 
+ Bootstrap Carosal - Carosal that scrolls to show users desired information i.e special offers. 
+ YouTube Player - to view games trailers a youtube player needed to created as Angular blocks calling YouTube URLs from a json file. By using the player I am able to call the video by its unique id rather than the URL. 
+ Tabs - As part of styling the game page rater than present the user with loads of information at once I implemented tabs to manage the information
+ ajoslin.promise-tracker - This is a 3rd party javascript file that allows me to do dynamic form validation for my contact us form. 
+ Responsive Design - The app is optimised for mobile, tablet and desktop. Where needed I used the correct angular divs to make the likes of the videos responsive. 

###Independent learning.
+ Modals - I ran out of time before i had a chance to implement any modals (modals are pop up pages with information). I looked at implementing them as a single partial or embeded in another partial
+ Modules - At one stage I looked at trying to use 2 modules in the one page but Angular doesn't allow this, instead I figured out that I could call an extra js file when creating my module. 
+ Authentication - I spent a lot of time figuring out how to authenticate users and secure pages in the route so they could not be accessed when user wasn't logged in. 
+ Yoeman - At begining I looked into Yoeman and its features which seemed very useful. I decided against using Yoeman as I felt I wouldn't have enough time to get up to speed with that and complete the assignment. 

[image1]: ./support/model.png
[image2]: ./support/gameJsonData.png
[image3]: ./support/componentDesign.png
[image4]: ./support/homepage.png
[image5]: ./support/about.png
[image6]: ./support/allGames.png
[image7]: ./support/gameDetails.png
[image8]: ./support/reviews.png
[image9]: ./support/contactUs.png
