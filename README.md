Craigslist Scraper Test
============================

This is a collection of Node JS modules that will scrape the first page of results retrieved when searching Raleigh apartments on Craigslist, save key apartment data into a MySQL database, then display a subset of that data in a plain HTML table on a local web host.

Installation
-----------------

Clone this repository to a local folder on your machine using the Clone button in the browser or the following command on your local machine:

```
git clone https://github.com/scduvall/craigslist-test.git
```

### MySQL Set-Up

This test assumes you have a local MySQL server installed. 
You can find the necessary tools and instructions at <https://dev.mysql.com/downloads/installer/> on how to do this, if you don't already have one.

You'll need to create your own MySQL database once your local server is up and running. 
Once this is done, open the file `mysql_init.js` and replace the object values `host`, `user`, `password`, and `database` with whatever matches your particular installation in the following statement:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});
```

### Node JS

Install [Node JS](http://nodejs.org/) on your machine if you haven't already.

In a command line of your choice (I like to use Git Bash), navigate to your local project folder and run `install npm` to instantiate that folder as a Node project. Assuming `package.json` is present, a folder called `/node_modules` will be created containing all Node JS module dependencies necessary to run this project.

Instruction
-----------------------

Because this project does not have an interface wrapper that synchronously runs all the modules, the critical modules will have to be run manually from the command prompt in order. Run the files as follows to get the desired result:

*Note: mysql_init.js does not have to be run; it is a custom module that will be accessed by the other project modules to maintain a dedicated connection to your MySQL database*

1. `node create_table.js`

      This will create a table called `apartments` in the database. You can call this file multiple times for testing purposes - it will detect a duplicate table and overwrite it.
      
2. `node extract_craigslist.js`

      This will run a scraping script on the Craigslist Raleigh Apartment Search URL (https://raleigh.craigslist.org/search/apa), and save key data into the `apartments` table.
      
3. `node server.js`

      This queries apartment price data from the `apartments` table, organizes it into an HTML table compiling a count for apartment price ranges, and prepares a local web server to recieve the data. 
      
      Navigate to http://localhost:8080/ in your browser, or refresh the URL if you already have it open, to dynamically serve the HTML table to the page. You should see a 2-column table with price ranges (in increments of $500) and total inventory tallying the count for each price range (based on the data scraped from Craigslist, naturally).
