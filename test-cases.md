# STUDENT

## Happy Path
 - [ ] Student is able to register
 - [ ] Student is able to log in
 - [ ] Student is able to modify their profile information
 - [ ] Student is able to add skills
 - [ ] Student is able to remove skills
 - [ ] Student is able to view their accepted mentorship relationships
 - [ ] Student is able to send messages to mentors
 - [ ] Student is able to view their pending invites for mentorship relationships
 - [ ] Student is able to click on a mentor to view their profile information
 - [ ] Student is able to search admin-approved mentors by name
 - [ ] Student is able to search admin-approved mentors by skill-tag
 - [ ] Student is able to search admin-approved mentors by name and skill-tag
 - [ ] Student is able to click on a mentor to view their profile information
 - [ ] Student is able to send mentorship request
 - [ ] Student is able to cancel mentorship request prior to submitting
 - [ ] Student is able to view their active jobs
 - [ ] Student is able to view their pending job applications
 - [ ] Student is able to view their completed jobs
 - [ ] Student is able to click on a job to view the job details
 - [ ] Student is able to search open jobs by name
 - [ ] Student is able to search open jobs by skill-tag
 - [ ] Student is able to search open jobs by name and skill-tag
 - [ ] Student is able to click on a job to view the job details
 - [ ] Student is able to send job application
 - [ ] Student is able to invite mentor to job
 - [ ] Student is able to cancel application prior to submitting

## Unhappy Path
 - [ ] Student is not able to register if required field is blank
 - [ ] Student is not able to log in with incorrect credentials
 - [ ] Student is not able to save changes if required field is blank
 - [ ] Student's My Mentorships view does not reflect mentors with whom they have no relationship
 - [ ] Student cannot search for mentors that are not approved by an admin
 - [ ] Student's My Jobs view does not reflect jobs with which they are not associated
 - [ ] Student is not able to view other users' applications
 - [ ] Student cannot search for closed jobs
 - [ ] Student cannot access /admin
 - [ ] Student cannot access /jobs/new


# MENTOR

## Happy Path
 - [ ] Mentor is able to register
 - [ ] Mentor is able to log in
 - [ ] Mentor is able to modify their profile information
 - [ ] Mentor is able to add skills
 - [ ] Mentor is able to remove skills
 - [ ] Mentor is able to submit their profile for admin approval
 - [ ] Mentor is able to view their accepted mentorship relationships
 - [ ] Mentor is able to view their pending invites for mentorship relationships
 - [ ] Mentor is able to click on a student to view their profile information
 - [ ] Mentor is able to click on a job to view the job details
 - [ ] Mentor is able to accept mentorship invitation
 - [ ] Mentor is able to decline mentorship invitation

## Unhappy Path
 - [ ] Mentor is not able to register if required field is blank
 - [ ] Mentor is not able to log in with incorrect credentials
 - [ ] Mentor is not able to save changes if required field is blank
 - [ ] Mentor is no longer able to submit their profile for admin approval once Approved
 - [ ] Mentor's My Mentorships view does not reflect mentors with whom they have no relationship
 - [ ] Mentor is not able to view other users' applications
 - [ ] Mentor cannot access /admin
 - [ ] Mentor cannot access /jobs/new
 - [ ] Mentor cannot access /search/jobs
 - [ ] Mentor cannot access /jobs/detail/apply/:id
 - [ ] Mentor cannot access /jobs
 - [ ] Mentor cannot access /search/mentors
 - [ ] Mentor cannot access mentor invite modal


# CLIENT

## Happy Path
 - [ ] Client is able to register
 - [ ] Client is able to log in
 - [ ] Client is able to modify their profile information
 - [ ] Client is able to add skills
 - [ ] Client is able to remove skills
 - [ ] Client is able to view their active jobs
 - [ ] Client is able to view their jobs pending applications
 - [ ] Client is able to view their completed jobs
 - [ ] Client is able to click on a job to view the job details
 - [ ] Client is able to view list of applicants for the selected job
 - [ ] Client is able to click on an applicant to view their application details
 - [ ] Client is able to open and view applicant's resume attachment
 - [ ] Client is able to click on an applicants mentor to view their profile information
 - [ ] Client is able to hire applicant
 - [ ] Client is able to mark job as completed
 - [ ] Client is able to post a new job

## Unhappy Path
 - [ ] Client is not able to register if required field is blank
 - [ ] Client is not able to log in with incorrect credentials
 - [ ] Client is not able to save changes if required field is blank
 - [ ] Client's My Jobs view does not reflect jobs with which they are not associated
 - [ ] Client is not able to submit job if required field is blank
 - [ ] Client cannot access /admin
 - [ ] Client cannot access /search/jobs
 - [ ] Client cannot access /jobs/detail/apply/:id
 - [ ] Client cannot access /search/mentors
 - [ ] Client cannot access /mentors
 - [ ] Client cannot access mentor invite modal


# ADMIN

## Happy Path
 - [ ] Admin is able to register
 - [ ] Admin is able to log in
 - [ ] Admin is able to modify their profile information
 - [ ] Admin is able to add skills
 - [ ] Admin is able to remove skills
 - [ ] Admin is able to view approved mentors
 - [ ] Admin is able to view mentors pending approval
 - [ ] Admin is able to click on a mentor to view their profile information
 - [ ] Admin is able to approve mentors
 - [ ] Admin is able to decline mentors

## Unhappy Path
 - [ ] Admin is not able to register if required field is blank
 - [ ] Admin is not able to log in with incorrect credentials
 - [ ] Admin is not able to save changes if required field is blank
 - [ ] Admin is not able to see mentors that have not applied or have been rejected

# STYLE GUIDE

 - [ ] All components are using Material-UI to their fullest extent
 - [ ] All components are using the Ubuntu font
 - [ ] All primary buttons are <Button variant="contained" color="primary">
 - [ ] All secondary (cancel/decline) buttons are <Button variant="contained" color="secondary">
 - [ ] All inputs are <TextField /> and have a label={}
        Other formatting options:
            Required: required attribute, if applicable
            Dropdowns: select attribute
            Text Area: multiline={true} rows={}
 - [ ] All Skill tags are <Chip color="secondary" size="small" />
 - [ ] The Main page header should be <Typography variant="h1" color="secondary">
        This is the page you are on - Ex: My Mentorships, My Profile, etc
 - [ ] List Item header should be <Typography variant="h6" color="primary">
        This is the User's Name for mentorships/applications or the Project Name for jobs
 - [ ] List Item text should be <Typography variant="p" color="secondary">
        This is the User's job title/focus for mentorships/applications, or the Client Name for jobs
 - [ ] Detail header should be <Typography variant="h2" color="primary">
        This is the User's Name for mentorships/applications or the Project Name for jobs
 - [ ] Detail subheader should be  <Typography variant="h4" color="secondary">
        This is the User's job title/focus for mentorships/applications, or the Client Name for jobs
 - [ ] Detail text should be  <Typography variant="p" color="secondary">
        This applies to any additional details
 - [ ] Hyperlink text should be  <Typography variant="p" color="primary">
        This applies to any additional details
 - [ ] All console logs are removed
 - [ ] Code is appropriately commented

# ACCESSIBILITY/UX

- [ ] Alt text on images
- [ ] Hover text on interactive elements (buttons and inputs)
- [ ] Visual Feedback on buttons
- [ ] Dialog confirmation boxes
- [ ] Error message gives steps to resolve
- [ ] Conditional render "no items to display" when applicable (prime the user on how to add?)

# SECURITY

- [ ] Cookies & Sessions
- [ ] Salting & Hashing
- [ ] All secrets are saved the the .env
- [ ] All Components/Routes on the front-end are protected based on user type
- [ ] All router requests are protected on the back-end based on user type
