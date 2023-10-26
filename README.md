
# CMS-tech-blog

<img>

## Description

This project is a CMS style informational blogpost website. It is a full stack web application, built from scratch. It uses an ORM database on the backend(SQL) alongside an MVC schema, with Sequelize providing the Models, ExpressJS handling the Controllers, and Handlebars rendering the Views.      

This tech-blog is more of a demonstration of the technologies and ideas used to build it. Functionally, it is bare bones and doesn't look at all great or modern. It does, however, provide  a good foundation for further development and expansion.          

As of now the site will allow a user to sign up with a simple account and log in with it. Passwords are hashed with bcrypt and password cleartext hashing happens before hitting logic on the server backend. Once logged in, a user can view specific posts and its comments on the blog, even adding a post of their own from their user dashboard

This project took a lot of time and focus. I'm not entirely proud of how it looks and functions right now, but I am immensely proud of all the work I put into it, long hours sessions, lots of coffee, and stressful debugging sessions. It is probably my proudest one yet as I've navigated the Fullstack Web Dev Bootcamp, and its a really cool feeling to build something like this from the ground up and have it working and functioning well. 

## Installation

To install this project, clone the repository anywhere and install the necessary dependencies with 

`npm install`      

The back end server can then be started  with 

`npm start`   

For local development and testing, a .env file will need to be set up, following the same format as seen in the env.EXAMPLE file. (the important part there will be setting whatever user and password you have accessing your local SQL database).  

Otherwise, if using a deployment service like Heroku or Railway, then special variables will have to be set up for SQL to connect to the server and function properly. 

## Usage

Firstly, at the default site landing page, you will see the 5 most recent posts on the blog. To view any of these posts or do anything further on the site, you will need to log in to an account, or sign up with one if you haven't already, links to both functionalities are found in the navigation panel on the left side.      

Once signed in, you can click on any  post to view it and any comments attached to it. You will be able to leave a comment of your own if you would like. 

From there, you can return to the home screen, view all blogposts, or navigate to your own dashboard, all from the  navvigation panel on the left. At the user dashboard, you will be able to add a rudimentary blogpost of your own, as well as view any posts you have made thus far. You'll be able to edit or delete any posts you have made from there as well. Once you are done, click the Logout button in the top right corner. Otherwise, you can stay logged in until the server closes your session and logs you out after 12 hours of inactivity. 

Link to project repository: [https://github.com/jrapich/tech-blog](https://github.com/jrapich/tech-blog)

## Tests

no tests needed/prepared at this time.

## Credits

no other contributors at this time.

At one point I was having a difficult time using a boolean value from the .env file for various debugging, this blogpost by Ericc Broucek helped me figuring out how to use them properly in JavaScript:

[https://www.ericbroucek.us/blog/boolean-values-using-dotenv/](https://www.ericbroucek.us/blog/boolean-values-using-dotenv/)

I've used several free-use icons in various places on the site, they can be found here:

[https://icon-library.com/icon/notebook-icon-png-18.html](https://icon-library.com/icon/notebook-icon-png-18.html)

[https://icon-library.com/icon/notebook-icon-png-20.html](https://icon-library.com/icon/notebook-icon-png-20.html)

[https://icon-library.com/icon/remove-icon-12.html](https://icon-library.com/icon/remove-icon-12.html)

[https://icon-library.com/icon/modify-icon-2.html](https://icon-library.com/icon/modify-icon-2.html)

## Future Development

Several points I would like to do in the future of maintaining this project:

Mobile-first design and better responsiveness. Currently the site looks quite bad on mobile, only partially being mobile responsive. I'd like to fix that at a later date.

Better, unique, and good looking styling and colors. The site overall looks bad but it is functional and simple enough. I'd like to improve it so it stands out and looks better.

Self hosting. Right now it is hosted on Railway. I'd like to self host this project entirely on a linux server at home, as I have a hobby of doing that with other things. Hosting something I've built myself would be really cool.

Future usage. I'd like to use this as a real, personal, self hosted blog site in the future. Right now it is just proof of concept with the tech stack used and doesn't really serve a real purpose. I'd like to further tweak it and use it for my own personal self hosted blog someday. I think it would be a fun hobby project to maintain, and would likely look good on a portfolio/resume.

## Contributing

How to contribute:
Please reach out to me at jeremysr@protonmail.com or make a pull request at [https://github.com/jrapich/tech-blog](https://github.com/jrapich/tech-blog)

## Questions?

Any further questions, comments, or bug reports, can be sent to me at jeremysr@protonmail.com

https://www.github.com/jrapich

## License

This project protected under MIT License.

All rights reserved. See /LICENSE for more information.