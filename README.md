# MeloMantra
MeloMantra Music Platform Development

XML Project 2 Documentation Phase 1

Spotify Developer Account:
In light of our team members' existing Spotify developer accounts, we proceeded directly to creating a new application within the Spotify Developer Dashboard.


 ![Picture -1](https://github.com/user-attachments/assets/fa2ab720-4dcf-439b-ab9d-a7f3c558e800)






After creating the developer account, we created an app in the Spotify dashboard.

 
![Picture 1](https://github.com/user-attachments/assets/71a4696f-aa3b-4b27-bef0-0b143356351c)

  
![Picture 2](https://github.com/user-attachments/assets/1f707b03-2507-40bf-84a1-96f8a9c82726)

![Picture 3](https://github.com/user-attachments/assets/11f50bd9-8b91-4fd9-b009-f88bf9b54d1e)
App Created

 
Once the app is created, copied the Client ID and Client Secret, which is used for calling the Spotify API and is confidential.




The JavaScript code is designed to fetch and display data from the Spotify API, specifically focusing on music genres and playlists. 

Client ID and Client Secret:
•	The clientId and clientSecret variables store the credentials required for authentication when making requests to the Spotify API.


 ![Picture 4](https://github.com/user-attachments/assets/b4d17891-0b90-4655-be8a-de5479d15f73)
 

Access Token Retrieval:
•	The getToken() function is an asynchronous function that fetches an access token from the Spotify API using the client credentials flow.
•	It sends a POST request to the token endpoint (https://accounts.spotify.com/api/token) with the client ID and client secret in the request headers.
•	Upon receiving a response, it extracts the access token from the JSON data and stores it in the accessToken variable.

![Picture 5](https://github.com/user-attachments/assets/100ac6d4-90d1-4c25-98c7-a9df8c15e249)



Data Fetching:
•	The getData(token) function fetches genre data from the Spotify API using the obtained access token.
•	It sends a GET request to the API endpoint (https://api.spotify.com/v1/browse/categories) with the access token in the request headers.
•	The response data is then parsed as JSON, and the displayGenre(itemList) function is called to display the fetched genres on the webpage.

![Picture 6](https://github.com/user-attachments/assets/8da50f8c-8f89-49c1-ad9e-5a6d39b10f81)

![Picture 7](https://github.com/user-attachments/assets/37701206-5597-496f-b0cf-314491bd286c)



Genre Display:
•	The displayGenre(itemList) function dynamically generates HTML markup to display each genre as a card.
•	It iterates over the list of genres (itemList) and constructs HTML elements containing the genre's name and image.
•	The constructed HTML markup is then inserted into the container element with the ID container.
 

 ![Picture 8](https://github.com/user-attachments/assets/43372f84-acba-4a3e-8603-060857bd3833)



Additional Functionalities:
•	The scrollToGenres() function scrolls smoothly to the genres section when called, enhancing user experience.
![Picture 9](https://github.com/user-attachments/assets/f17e7edb-ffbf-41ab-b515-16487e2332c8)

 


•	The alternateText() function dynamically alternates text content within an element at regular intervals, adding a dynamic element to the webpage.

![Picture 10](https://github.com/user-attachments/assets/285c27a1-60c6-4063-b855-e7870bc74cfe)




Key Features:
•	Spotify API Integration: The platform integrates with the Spotify API to fetch music genre data and display playlists associated with each genre.
•	Dynamic Text Alternation: The hero section of the platform features dynamic text alternation, providing users with engaging content.
•	Responsive Design: The platform is designed to be responsive, ensuring compatibility across various devices and screen sizes.
•	Navigation: The navigation menu allows users to easily navigate between different sections of the platform, including the home page and genres section.

Screenshots

![Picture 11](https://github.com/user-attachments/assets/e116cee3-3451-4182-acb3-711d5d905961)

 
 ![Picture 12](https://github.com/user-attachments/assets/a878fe4f-246e-4929-9a86-20128c663c96)

![Picture 13](https://github.com/user-attachments/assets/72a50bf6-3c69-4e77-969c-a4820de91d86)


 



