# Engineer Take-Home Project

Hey there, congrats on passing the interview! We now want to give you a small take-home project to work on for a couple of days to assess your technical skills. This will be in replacement of a technical interview, so you can treat it as such.

**NOTE:** It's not required that you finish building the whole thing, but try your best! The more you finish, the better.

### What you'll be building

For your take-home project, you'll be building a **basic session manager + display.** It will look pretty similar to how an Hours session typically works.

You will only have to build 3 pages: 

1. Home page
    - Can be blank, or have a little bit of informational text on it
2. Join page
    - Simulates the invite page on the real Hours site
    - Allows user to input their name and saves it in `localStorage` as `name`
    - Redirected to from session page if `name` is not in `localStorage`
    - Accessible at a unique URL address
        - `/join/[sessionId]`
    - NOTE: You can also recreate this page with a modal/popup on the session page
3. Session page
    - Simulates the participants display on a regular Hours session
    - Display the names of everyone in the session
    - Trigger and display events when someone leaves and joins
        - Just like a regular Hours session
    - Accessible at a unique URL address
        - `/session/[sessionId]`

### Requirements

- Following developer best practices
    - Clean code, using React components, good variable names, etc.
- Must use the following MERN stack structure:
    - Frontend: Next.js + React.js
    - Backend: Node.js + Express + Socket.IO
    - Styling: SCSS + SCSS modules
- Must be styled at least a little bit
    - No need to go overboard, but make everything look nice

### Timeline

1. Hand out take-home project (Saturday, June 19)
2. Submission deadline (Wednesday 11:59pm, June 23)
3. Results (Friday, June 25)

### Extra Notes

- For simplicity, you can store the session data however you'd like
    - We recommend storing it in a single variable
    - If you want to use a database, make sure you use MongoDB!
- Extra credit! (completely optional)
    - Deploy it publicly
        - Use Vercel and Digital Ocean App Platform (not required but preferable)
    - Structure the project into a mono-repo
    - Add a chat feature!
        - If you want to go even further than that, add any features you'd see on a regular Hours session. Be sure to pace yourself!

### General steps

1. Setup and build the project locally
2. Push to your GitHub repo(s)
    - Make sure the repository is public
3. Send us the link! (include the website link if you deployed it)

**Good luck and have fun!**