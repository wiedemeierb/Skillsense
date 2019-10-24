![REPO SIZE](https://img.shields.io/github/repo-size/teamskillsense/skillsense.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/teamskillsense/skillsense.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/teamskillsense/skillsense.svg?style=social)

# SkillSense

*Project Duration: 2 Week Sprint*

SkillSense is a professional networking application that brings together Students, Mentors, and Clients to complete freelance assignments. Students looking to break into the tech industry can find and connect with experienced professionals in the field willing to offer their guidance and expertise. In partnership with a chosen Mentor, Students can apply for and complete jobs that have been posted on SkillSense by prospective Clients. By creating a space that allows for professional growth while ensuring quality and productivity, SkillSense helps Students to get experience; allows Mentors to help members of their community in getting started; and enables Clients to offer first-time opportunities while ensuring that the job is done well with the help of an experienced professional.

Live Version deployed on Heroku at: []

## Screenshot

(still being documented)

## Prerequisites

Before getting started launching this application, you should have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Database Setup

Make a new database called `skill_sense` in PostgreSQL and use the **database.sql** file in the root of this project to set up all of your tables. This file will also include some important static data required by several tables: these will include information such as user types, skills tags for jobs/users, job status (in progress, completed, etc.), and mentor approval status. 

## Creating the .ENV

* Create a `.env` file at the root of the project. This file will require several pieces of information that will each need to acquired separately. Further instructions on obtaining these keys are provided below:
    ```
    SERVER_SESSION_SECRET = ***********
    AWS_ACCESS_KEY_ID = ********************
    AWS_SECRET_KEY = ********************
    AWS_BUCKET = **************    
    NODE_MAILER_USER = ****************
    NODE_MAILER_USER_KEY = **************
    ```

First you will need to establish a **SERVER_SESSION_SECRET** to keep your application secure. Here's a site that can help you generate a secret: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). 

### AWS

To enable use of AWS file uploading for resume attachments on job applications, you will need to setup an [Amazon Simple Storage (Amazon S3)](https://aws.amazon.com/s3/) account and create a "bucket" for storage on the internet. Follow these [instructions](https://docs.aws.amazon.com/en_pv/AmazonS3/latest/gsg/GetStartedWithS3.html) for getting started with Amazon Web Services. Registering for the S3 account will grant you the AWS Free Usage Tier pricing per Amazon, though limitations on data usage will apply. For information, see this page on [Storage Pricing](https://aws.amazon.com/s3/pricing/?nc=sn&loc=4). A means of payment will still be required regardless of whether or not you are using a paid plan. Once you have added payment information, you can follow the beginning of this [tutorial](https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689) for how to set up an S3 Bucket on your account. Disregard anything after “Back End” - this has been provided for you already.

When setting up your account, make sure to record the **AWSAccessKeyId** and the **AWSSecretKey**. This information should be held securely as it is what will allow the application to access your AWS S3 storage bucket.

You will also need to update your permissions on the new S3 Bucket. From the same place you accessed your CORS settings in the tutorial above, you will need to select **BLOCK PUBLIC ACCESS** and turn off any settings that are blocking public access. No other boxes on this page should be checked.

### Nodemailer 

In order to use [Nodemailer](https://nodemailer.com/) to send email notifications as an admin to individual users, you will need to establish what address these messages should be sent from. The sending email address should be designated in the .env as the **NODE_MAILER_USER**. Given the standard security most email providers have in place to prevent unapproved third party sign-in and use, however, a basic user password will not be effective. The process of getting around this security measure may vary from service to service, but the path we recommend would be obtaining an **App Password** through Gmail. Instructions to create an App Password for your **NODEMAILER_USER_KEY** can be found at this [Google Account Help Article](https://support.google.com/accounts/answer/185833?hl=en).

## Installation

1. Run `npm install`    
2. Start Postgres using `brew services start postgresql`
    - only required if PG is not already running
3. Run `npm run server`
4. Run `npm run client`
5. Navigate to `localhost:3000`

## How to Use SkillSense

- A new user to SkillSense will register for an account either as a Student, Mentor or Client. Registration will require an email, password, a user's name, professional title, location, networking links, and a short bio, which will all be displayed (password excluded) on a user's public profile when networking or applying for jobs.
    - Subsequent logins will require email and password.
- After logging in, a user will be brought to their profile page where all of their personal information can be updated. Students/Mentors may also add skill tags to their profile to reflect their abilities. These will aid in the application process as well as for helping Students find Mentors with a particular specialization. 
- **Students on SkillSense:**
    - Search for available Mentors by name or skill in **Mentor Search**. View a selected Mentor's public profile and send a request to connect to open the possibility of working on future projects together. 
    - *Active* and *Invited* Mentors can be viewed in **My Mentorships**.
    - Freelance work can be found by searching project title or skills in **Job Search**. Selecting details for any job in the search results will open a page displaying important information such as: project title, position, client, location, duration, budget, a description for the job, and desired skills.
    - Apply for jobs by providing Clients with a cover letter, resume, and selected Mentor to work with.
    - Track *Active*, *Applied*, and *Completed* projects in **My Jobs**, with the ability to review job details.
- **Mentors on SkillSense:**
    - View active Mentorships and pending Invites to connect with Students in **My Mentorships*. Mentors can view details from a Student's public profile and monitor all jobs (active, applied, completed) that they are teamed up on. Access to view details for those jobs is available from this page.
- **Clients on SkillSense:**
    - Track *Active*, *Completed*, and projects *Pending Hire* in **My Jobs**. Details for all of a Client's posted jobs are available for review. In the details page for a selected job, a Client can view their current hire or their current applicants — and hire an applicant once they've made a decision. Applicant details will include information both from the Student's profile as well as the Mentor they've requested for that project.
    - In **Post New Job**, Clients can create a new project listing for work they're looking to have completed by Students on SkillSense. Clients will provide a project title, position, duration and budget, a description of what they're looking to have accomplished, and desired skills. 
- **Messaging on SkillSense:**
    - All users have access to a **Messages** center where they can communicate with individuals they've connected with on the application, whether it be Student, Mentor, or Client. Users must be connected on a project or through a Mentorship before they can send messages back and forth. 
    - Requesting a Mentor will automatically prompt Students to send a custom message with their invitation.
    - A *Send Message* option to start a conversation will be available on the public profile of all connected users and on the job details for an active assignment. 

## Built With

This application uses the following technologies:

- [React](https://reactjs.org/)
- [Redux](https://maven.apache.org/)
- [Redux-Sagas](https://redux-saga.js.org/)
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Amazon Web Services (AWS)](https://aws.amazon.com/)
- [Nodemailer](https://nodemailer.com/)

(a full list of dependencies can be found in `package.json`)

## Acknowledgements

- First and foremost, we would like to dedicate this project to Jack Morey + Vivek Javangula: the two individuals who came up with the original concept for this application. They have ambitious goals for SkillSense, and we're proud to have laid down the initial groundwork for them to build from in the future. 
- We would like to thank [Prime Digital Academy](https://github.com/PrimeAcademy) for allowing us the opportunity to put our acquired skills into action by connecting us with a real-world client with an extraordinary vision. 
- A very special thanks to our instructors, Dane Smith and Kris Szafranksi, for providing us with the tools and knowledge to build this application. Their instruction has been invaluable in leading us down the road to successful careers as software developers. 

## Support

For any questions, concerns, or suggestions feels free to contact any of the developers behind this project:
[David Heisel](https://github.com/dmheisel) -- d.m.heisel@gmail.com
[Allyson Holdahl](https://github.com/aholdahl) -- allyson.holdahl@gmail.com
[Delaney Sharratt](https://github.com/laneymckee) -- delaney.sharratt@gmail.com
[Brandon Weidemeier](https://github.com/wiedemeierb) -- brandon.wiedemeier@gmail.com