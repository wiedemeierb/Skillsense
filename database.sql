--DATABASE NAME 'skill_sense'

CREATE TABLE "user_type" (
  "id" serial primary key,
  "user_type" TEXT NOT NULL UNIQUE
);

CREATE TABLE "skill_tags" (
  "id" serial PRIMARY KEY,
  "tag" TEXT NOT NULL
);


CREATE TABLE "mentor_status" (
  "id" serial PRIMARY KEY,
  "mentor_status" VARCHAR(510) NOT NULL
);


CREATE TABLE "job_status" (
  "id" serial PRIMARY KEY,
  "job_status" TEXT NOT NULL UNIQUE
);

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "location" VARCHAR(510),
  "focus_skill" VARCHAR(510),
  "bio" TEXT,
  "github_url" VARCHAR(510),
  "linkedin_url" VARCHAR(510),
  "website_url" VARCHAR(510),
  "access_id" integer NOT NULL references "user_type",
  "active" BOOLEAN DEFAULT TRUE,
  "approved_mentor" integer references "mentor_status"
);

CREATE TABLE "messages" (
  "id" serial PRIMARY KEY,
  "sender_id" integer NOT NULL references "users",
  "recipient_id" integer NOT NULL references "users",
  "message" VARCHAR(510) NOT NULL,
  "date_time" TIMESTAMP NOT NULL
);

CREATE TABLE "user_tags" (
  "id" serial PRIMARY KEY,
  "tag_id" integer NOT NULL references "tags" on delete cascade,
  "user_id" integer NOT NULL references "users" on delete cascade
);

CREATE TABLE "jobs" (
  "id" serial PRIMARY KEY,
  "project_title" TEXT NOT NULL,
  "position_title" VARCHAR(510) NOT NULL,
  "description" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "budget" integer NOT NULL,
  "mentor_required" BOOLEAN default TRUE,
  "status_id" integer NOT NULL references "job_status",
  "client_id" integer NOT NULL references "users"
);


CREATE TABLE "job_applicants" (
  "id" serial PRIMARY KEY,
  "job_id" integer NOT NULL references "jobs",
  "student_id" integer NOT NULL references "users",
  "payment_terms" TEXT NOT NULL,
  "cover_letter" TEXT NOT NULL,
  "attachment_url" TEXT,
  "mentor_id" integer references "users",
  "mentor_accepted" BOOLEAN default FALSE,
  "hired" BOOLEAN default false
);


CREATE TABLE "student_mentor" (
  "id" serial PRIMARY KEY,
  "student_id" integer NOT NULL references "users",
  "mentor_id" integer NOT NULL references "users",
  "message_id" integer NOT NULL references "messages",
  "accepted" BOOLEAN default FALSE
);


CREATE TABLE "job_tags" (
  "id" serial PRIMARY KEY,
  "job_id" integer NOT NULL references "jobs",
  "tag_id" integer NOT NULL references "tags"
);

INSERT INTO "job_status" ("status") VALUES ('Open'),('Offer Extended'),('In Progress'),('Completed');

INSERT INTO "mentor_status" ("status") VALUES ('Not Submitted'),('Pending Approval'),('Approved'),('N/A');

INSERT INTO "tags" ("tag") VALUES ('Adobe Photoshop'),('Adobe Illustrator'),('Adobe XD'),('Sketch'),('Responsive Web Design'),('UI/UX Design'),('Frontend Development'),('Backend Development'),('Full Stack Development'),('Mobile App Development'),('NoSQL'),('SQL'),('MySQL'),('.NET'),('C#'),('Java'),('JavaScript'),('TypeScript'),('Webpack'),('React'),('Angular'),('HTML5'),('CSS'),('LESS'),('SASS'),('Wordpress'),('PHP'),('QA/Testing');

INSERT INTO "user_type" ("access") VALUES ('Student'),('Mentor'),('Client'),('Admin');

INSERT INTO "users"
  (username, email, password, location, focus_skill, bio, github_url, linkedin_url, website_url, access_id)
VALUES
  ('David Heisel', 'david@david.com', '$2b$10$lMLT25VKV..jh.GjHD6OKuZvJhlEt8tvWr0TQHCaGZTlg5p/J9Mgu', 'Richfield, MN',
  'Full Stack Engineer', 'I am a Full Stack Engineering student currently enrolled at Prime', 'https://github.com/dmheisel',
  'https://www.linkedin.com/in/dmheisel/', 'google.com', 1);

INSERT INTO "users"
  (username, email, password, location, focus_skill, bio, github_url, linkedin_url, website_url, access_id)
VALUES
  ('Allyson Holdahl', 'allyson@allyson.com', '$2b$10$zd0zp2JsjXynrtEyEg8hje6LN5D1J66RSGZ29pNxffmXn6wQbXqyC', 'St. Paul, MN', 'Accessibility Developer', 'I have been actively enrolled in the Accessibility culture here in the Twin Cities area.  My focus is making sure everyone, with all abilities, have full access to all the wonderful things the internet has to offer.
', 'https://github.com/aholdahl', 'https://www.linkedin.com/in/allyson-holdahl/', 'google.com', 2);

INSERT INTO "users"
  (username, email, password, location, focus_skill, bio, github_url, linkedin_url, website_url, access_id)
VALUES
  ('Delaney Sharratt', 'delaney@delaney.com', '$2b$10$sfI2gf0dGMGiy2mnPeVT/eCjYua2rSJvX12r1QDd1UQGN0RHjAWbq', 'Minnetonka, MN', 'Boss', 'I run this app and approve Mentors', 'https://github.com/laneymckee', 'https://www.linkedin.com/in/delaney-mckee-sharratt/', 'google.com', 4);

INSERT INTO "users"
  (username, email, password, location, focus_skill, bio, github_url, linkedin_url, website_url, access_id)
VALUES
  ('Design Web Inc', 'brandon@brandon.com', '$2b$10$5glF4FYaITsOPMcKdJmfSuOZGs4R6UL/lyCOB0YXoavjFJa4j5Mhe', 'Minneapolis, MN', 'CEO', 'Design Web Inc was founded in 2010 with a focus of making it easier to navigate the website creation process.  We partner with many Fortune 500 companies and consistently growing our client and business portfolio.', 'https://github.com/wiedemeierb', 'https://www.linkedin.com/in/brandonwiedemeier/', 'google.com', 3);

INSERT INTO "jobs"
  (project_title, position_title, description, duration, budget, mentor_required, status_id, client_id)
VALUES
  ('Create Skillsense App', 'Full Stack Engineer', 'Creating a website that connects Students with Mentors, where they can partner to complete freelance work.  Clients will be able to post jobs and hire these Student Mentor partnerships', '1 month', '2000', TRUE, 1, 5);

INSERT INTO "jobs"
  (project_title, position_title, description, duration, budget, mentor_required, status_id, client_id)
VALUES
  ('Build Google Framework', 'SEO for the world', 'Create a search engine that scans the web for the exact page you are looking for.  Create one of the most powerful companies in the world', '1 year', '200000', TRUE, 1, 5);
