CREATE DATABASE timetablemanagement;

CREATE TABLE s5(
id SERIAL PRIMARY KEY,
timeperiod VARCHAR(255) NOT NULL,
monday  VARCHAR(60),
tuesday VARCHAR(60),
wednesday VARCHAR(60),
thursday VARCHAR(60),
friday VARCHAR(60)
);



CREATE TABLE subject_faculty(
s_id SERIAL PRIMARY KEY,
sub_name VARCHAR(60) NOT NULL,
fac_name VARCHAR(60) NOT NULL
);


