--DATABASE NAME "skill_sense"


CREATE TABLE "user_type" (
	"id" serial NOT NULL,
	"access" TEXT NOT NULL UNIQUE,
	CONSTRAINT "user_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"location" VARCHAR(255) NOT NULL,
	"focus_skill" VARCHAR(255) NOT NULL,
	"github_url" VARCHAR(255) NOT NULL,
	"linkedin_url" VARCHAR(255) NOT NULL,
	"website_url" VARCHAR(255) NOT NULL,
	"access_id" integer NOT NULL,
	"active" BOOLEAN NOT NULL,
	"approved_mentor" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_tags" (
	"id" serial NOT NULL,
	"tag_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "user_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"tag" TEXT NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "jobs" (
	"id" serial NOT NULL,
	"project_title" TEXT NOT NULL,
	"position_title" VARCHAR(255) NOT NULL,
	"description" TEXT NOT NULL,
	"due_date" DATE NOT NULL,
	"budget" VARCHAR(255) NOT NULL,
	"mentor_required" BOOLEAN NOT NULL,
	"status_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"hired_application" integer NOT NULL,
	CONSTRAINT "jobs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "job_status" (
	"id" serial NOT NULL,
	"status" TEXT NOT NULL UNIQUE,
	CONSTRAINT "job_status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "job_applicants" (
	"id" serial NOT NULL,
	"job_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"payment_terms" TEXT NOT NULL,
	"cover_letter" TEXT NOT NULL,
	"resume" TEXT NOT NULL,
	"mentor_id" integer NOT NULL,
	"mentor_accepted" BOOLEAN NOT NULL,
	CONSTRAINT "job_applicants_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "student_mentor" (
	"id" serial NOT NULL,
	"student_id" integer NOT NULL,
	"mentor_id" integer NOT NULL,
	"message_id" integer NOT NULL,
	"accepted" BOOLEAN NOT NULL,
	CONSTRAINT "student_mentor_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "job_tags" (
	"id" serial NOT NULL,
	"job_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "job_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "messages" (
	"id" serial NOT NULL,
	"sender_id" integer NOT NULL,
	"recipient_id" integer NOT NULL,
	"message" VARCHAR(255) NOT NULL,
	"date_time" DATETIME NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "mentor_status" (
	"id" serial NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	CONSTRAINT "mentor_status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("access_id") REFERENCES "user_type"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("approved_mentor") REFERENCES "mentor_status"("id");

ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_fk0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");
ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk0" FOREIGN KEY ("status_id") REFERENCES "job_status"("id");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk1" FOREIGN KEY ("client_id") REFERENCES "users"("id");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk2" FOREIGN KEY ("hired_application") REFERENCES "job_applicants"("id");


ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_fk0" FOREIGN KEY ("job_id") REFERENCES "jobs"("id");
ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_fk1" FOREIGN KEY ("student_id") REFERENCES "users"("id");
ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_fk2" FOREIGN KEY ("mentor_id") REFERENCES "users"("id");

ALTER TABLE "student_mentor" ADD CONSTRAINT "student_mentor_fk0" FOREIGN KEY ("student_id") REFERENCES "users"("id");
ALTER TABLE "student_mentor" ADD CONSTRAINT "student_mentor_fk1" FOREIGN KEY ("mentor_id") REFERENCES "users"("id");
ALTER TABLE "student_mentor" ADD CONSTRAINT "student_mentor_fk2" FOREIGN KEY ("message_id") REFERENCES "messages"("id");

ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_fk0" FOREIGN KEY ("job_id") REFERENCES "jobs"("id");
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("sender_id") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("recipient_id") REFERENCES "users"("id");

