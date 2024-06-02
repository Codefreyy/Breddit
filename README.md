# Project Name

> A modern and clean reddit clone with the Next.js App Router, TypeScript & Tailwind.
> Live demo [_here_](https://joy-breddit.vercel.app/). 

## Table of Contents

* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)


## General Information

This is a full-stack simple version of reddit clone to exercise my ability to create full-stack projects using next.js. And to prepare for my grad school graduation project in the summer of 2024.


## Technologies Used

<img height="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704"><img height="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png">  <img height="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png"><img height="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png"> <img height="50" src="https://user-images.githubusercontent.com/25181517/182884027-02cf00e4-6ac5-49a8-816d-3287a26bc5b4.png"> 



## Features
- Infinite scrolling for dynamically loading posts
- Authentication using NextAuth & Google
- Custom feed for authenticated users
- Advanced caching using Upstash Redis
- Optimistic updates for a great user experience
- Modern data fetching using React-Query
- A beautiful and highly functional post editor
- Image uploads & link previews
- Full comment functionality with nested replies
- ... and much more



## Screenshots
<img width="1426" alt="image" src="https://github.com/Codefreyy/Breddit/assets/104683968/acc90646-f589-4807-83bc-a7de824e265f">
<img width="679" alt="image" src="https://github.com/Codefreyy/Breddit/assets/104683968/609dda60-1a15-4425-8b7c-7df8f71ba4e8">



## Setup

1. Clone this repository first
2. Open it and install all the dependencies
3. Run `npm run dev`
4. Open in the browser

There are a few places where you need to provide your own information. Check the `.env`  file.

```
DATABASE_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

REDIS_URL=
REDIS_SECRET=
```

For the Google oAuth 2.0 configuration. You need to go the https://console.cloud.google.com/ and get the Google client Id and secret.
[This video](https://www.youtube.com/watch?v=OKMgyF5ezFs) and [this](https://www.youtube.com/watch?v=rL5egV4RH2k) is helpful to me.


## Room for Improvement

Include areas you believe need improvement / could be improved. Also add TODOs for future development.

To do:

- Allow users to see all the communities they joined.
- Allow users to see all the posts they posted.
- Allow users to delete the posted post.
- Implement dark mode
- Allow users to share the post with link
- Add popular posts sections where you can see the latest most voted posts which are not neccessary from the communities you've joined


## Acknowledgements

- This project was based on [this tutorial](https://www.youtube.com/watch?v=mSUKMfmLAt0&t=34312s).
