--DATABASE NAME 'skill_sense'

CREATE TABLE "user_type" (
  "id" serial primary key,
  "access" TEXT NOT NULL UNIQUE
);

CREATE TABLE "tags" (
  "id" serial PRIMARY KEY,
  "tag" TEXT NOT NULL
);


CREATE TABLE "mentor_status" (
  "id" serial PRIMARY KEY,
  "status" VARCHAR(510) NOT NULL
);


CREATE TABLE "job_status" (
  "id" serial PRIMARY KEY,
  "status" TEXT NOT NULL UNIQUE
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
  "due_date" DATE NOT NULL,
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
  "resume" TEXT NOT NULL,
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