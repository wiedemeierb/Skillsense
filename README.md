# SkillSense

*Project Duration: 2 Week Sprint*

SkillSense is a professional networking application that brings together Students, Mentors, and Clients to complete freelance assignments. Students looking to break into the tech industry can find and connect with experienced professionals in the field willing to offer their guidance and expertise. In partnership with a chosen Mentor, Students can apply for and complete jobs that have been posted on SkillSense by prospective Clients. By creating a space that allows for professional growth while ensuring quality and productivity, SkillSense helps Students to get experience, allows Mentors to help members of their community in getting started, and gives Clients the ability to offer opportunities to 

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

## API Keys & .ENV File

* Create a `.env` file at the root of the project. This file will require several pieces of information that will each need to acquired separately. Further instructions on obtaining these keys are provided below:
    ```
    SERVER_SESSION_SECRET = ***********
    AWS_ACCESS_KEY_ID = ********************
    AWS_SECRET_KEY = ********************
    AWS_BUCKET = **************    
    GOOGLE_KEY = ****************
    ```

First you will need to establish a **SERVER_SESSION_SECRET** to keep your application secure. Here's a site that can help you generate a secret: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). 

### AWS

To enable use of AWS file uploading for resume attachments on job applications, you will need to setup an [Amazon Simple Storage (Amazon S3)](https://aws.amazon.com/s3/) account and create a "bucket" for storage on the internet.

Follow these [instructions](https://docs.aws.amazon.com/en_pv/AmazonS3/latest/gsg/GetStartedWithS3.html) for getting started with Amazon Web Services. Registering for the S3 account will grant you the AWS Free Usage Tier pricing per Amazon, though limitations on data usage will apply. For information, see this page on [Storage Pricing](https://aws.amazon.com/s3/pricing/?nc=sn&loc=4). However, a means of payment will still be required regardless of whether or not you are using a paid plan.

Once you have added payment information, you can follow the beginning of this [tutorial](https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689) for how to set up an S3 Bucket on your account. Disregard anything after “Back End” - this has been provided for you already.

When setting up your account, make sure to record the **AWSAccessKeyId** and the **AWSSecretKey**. This information should be held securely as it is what will allow the application to access your AWS S3 storage bucket.

You will also need to update your permissions on the new S3 Bucket. From the same place you accessed your CORS settings in the tutorial above, you will need to select **BLOCK PUBLIC ACCESS** and turn off any settings that are blocking public access. No other boxes on this page should be checked.

### Nodemailer 

In order to use [Nodemailer](https://nodemailer.com/) to send email notifications as an admin to individual users, you will need to establish what address these messages should be sent from. Given the standard security most email providers have in place to prevent unapproved third party sign-in and use, a basic user password will not be effective. The process of getting around this security measure may vary from service to service, but the path we recommend would be obtaining an **App Password** through Gmail. Instructions to create an App Password for your **GOOGLE_KEY** can be found at this [Google Account Help Article](https://support.google.com/accounts/answer/185833?hl=en).

## Installation

* Run `npm install`    
* Start Postgres if it is not already running by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## How to Use SkillSense

Usage description in progress...

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

(A full list of dependencies can be found in `package.json`)

## Acknowledgements

- First and foremost, we would like to dedicate this project to Jack Morey + Vivek Javangula: the two individuals who came up with the original concept for this application. They have ambitious goals for SkillSense, and we're proud to have laid down the initial groundwork for them to build from in the future. 
- We would like to thank [Prime Digital Academy](https://github.com/PrimeAcademy) for allowing us the opportunity to put our acquired skills into action by connecting us with a real-world client with an extraordinary vision. 
- A very special thanks to our instructors, Dane Smith and Kris Szafranksi, for providing us with the tools and knowledge to build this application. Their instruction has been invaluable in leading us down the road to successful careers as software developers. 
