# What is it?

Tidder is a full-stack application built to work with Reddit's OAuth API. You click sign in, allow Tidder access to your account, and you can now read Reddit in a completely different UI/UX.

# Stage

Tidder is in an EXTREME stage of work-in-progress. I am essentially re-building Reddit from scratch, and have many limitations of the Reddit API (while decent) to work with. The code isn't perfect, but it does work right now. If you set up a Reddit app in your preferences and input the details into the relevant .envs, it should work out of the box.

Browser compatibility is not a focus right now either, everything is tested in the latest Chrome version to-date (85.0), and I haven't delved into the other browsers at this point. Down the line, I do plan on adding full latest-browser support, but not old versions such as IE11 (why ruin a fun project like that?).

# Focus

The focus of this project is both a test of my UI/UX skills, and a showcase of functional React programming. It is NOT intended to be a production instance for use by the masses, just an interesting project showing how to work with an Oauth API.

# Stack

The front-end client is built in React, bootstrapped by CRA. I considered writing all the CSS from scratch, but then decided not to in favour of the accessibility principles Material-UI have already implemented for me. Plus, it looks pretty nice, and is quick to work with. It's not as customizable as I'd like, but it gets the job done. I also decided against Redux in favour of React's Context API, both because Redux would increase the workload, and because I don't really need a bloated state manager for a reader app.

The back-end is a scaffolded Node.js/Express server, using Passport for authentication. I am using a Reddit API wrapper (Snoowrap) to accelerate development time, although I might create my own wrapper down the line as it's much slower than running my own requests.

A MongoDB instance is attached (I just used a free Atlas instance), but it's barebones and only used in the Passport authentication. I plan on separating those in the future, and making this database-less.

# Authentication / Privacy

The app does not collect/store any information outside of a Reddit user ID, and a Reddit username. As said before, I will be removing even this in the future. Any information, such as the access tokens and refresh tokens, are stored in secure cookies.

Only the scopes absolutely necessary for the app to function are requested from Reddit.
