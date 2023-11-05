CREATE DATABASE timetablemanagement;

CREATE TABLE s5(
id SERIAL PRIMARY KEY,
timeperiod VARCHAR(255) NOT NULL,
monday  VARCHAR(60) NOT NULL,
tuesday VARCHAR(60) NOT NULL,
wednesday VARCHAR(60) NOT NULL,
thursday VARCHAR(60) NOT NULL,
friday VARCHAR(60) NOT NULL
);

CREATE TABLE subject_faculty(
s_id SERIAL PRIMARY KEY,
s5_id INT REFERENCES s5(id),
sub_name VARCHAR(60) NOT NULL,
fac_name VARCHAR(60) NOT NULL
);