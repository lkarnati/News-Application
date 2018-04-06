# News-Application

Backend - Node.js
Frontend - AngularJS
Database - lowdb

1. Download the application from github
2. Install node
3. Command to download all the packages from package.json npm install
4. Command to start the node server : node server.js
5. The port is set to 8080 in server.js
6. http://localhost:8080/ - Open this in browser
7. Login with username: admin and password: password
8. Wrong credentials would throw an error after verification with database through back end code (nodejs)
9. Header :
    Left: Home, Saved Articles
    Right: User dropdow with Saved Articles and Sign out
   Footer - NewsAPI url
10. When you login it takes you to home page where you can select 5 sources at max from the list of sources provided by newsAPI.
11. When you select more than 5, the UI displays an error message.
12. When a source is selected, a tile (for each of the source selected, one below the other) gets displayed beside the multiselect dropdown.
13. When clicked on the source, it takes the user to the articles page, where the top 10 articles are displayed each in an accordion.
14. Accordion header contains the title, author and star icon.
15. When clicked on the accordion, it expands to show the other information.
16. When clicked on the hollow star, the article can be saved after confirmation through dialog box.
17. Similarly, a saved article can be removed by clicking on the yellow star after confirmation through dialog box.
18. The header on top contains the saved articles button which when clicked displays all the saved articles.
    (Also available in user dropdown at top right on the header)