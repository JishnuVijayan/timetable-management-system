CREATE DATABASE timetablemanagement;

CREATE TABLE s3_cse(
id SERIAL PRIMARY KEY,
timeperiod VARCHAR(255) NOT NULL,
monday  VARCHAR(60),
tuesday VARCHAR(60),
wednesday VARCHAR(60),
thursday VARCHAR(60),
friday VARCHAR(60)
);



CREATE TABLE s3_cse_sub_fac(
s_id SERIAL PRIMARY KEY,
sub_name VARCHAR(60) NOT NULL,
fac_name VARCHAR(60) NOT NULL
);


CREATE TABLE s5_cse(
id SERIAL PRIMARY KEY,
timeperiod VARCHAR(255) NOT NULL,
monday  VARCHAR(60),
tuesday VARCHAR(60),
wednesday VARCHAR(60),
thursday VARCHAR(60),
friday VARCHAR(60)
);



CREATE TABLE s5_cse_sub_fac(
s_id SERIAL PRIMARY KEY,
sub_name VARCHAR(60) NOT NULL,
fac_name VARCHAR(60) NOT NULL
);

CREATE TABLE s7_cse(
id SERIAL PRIMARY KEY,
timeperiod VARCHAR(255) NOT NULL,
monday  VARCHAR(60),
tuesday VARCHAR(60),
wednesday VARCHAR(60),
thursday VARCHAR(60),
friday VARCHAR(60)
);



CREATE TABLE s7_cse_sub_fac(
s_id SERIAL PRIMARY KEY,
sub_name VARCHAR(60) NOT NULL,
fac_name VARCHAR(60) NOT NULL
);

