--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.24
-- Dumped by pg_dump version 9.4.24
-- Started on 2021-02-06 10:15:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

--
-- TOC entry 1 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2034 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 178 (class 1259 OID 25545)
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    datetime timestamp with time zone DEFAULT now(),
    user_id integer,
    action character varying(150)
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 25543)
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logs_id_seq OWNER TO postgres;

--
-- TOC entry 2035 (class 0 OID 0)
-- Dependencies: 177
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- TOC entry 174 (class 1259 OID 25516)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    level integer NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 25514)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 2037 (class 0 OID 0)
-- Dependencies: 173
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 176 (class 1259 OID 25526)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(500) NOT NULL,
    rol_id integer NOT NULL,
    access_token character varying(500) NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 25524)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2038 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 1897 (class 2604 OID 25548)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- TOC entry 1894 (class 2604 OID 25519)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 1895 (class 2604 OID 25529)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2025 (class 0 OID 25545)
-- Dependencies: 178
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (id, datetime, user_id, action) FROM stdin;
1	2021-02-05 23:03:35.682-05	1	List.roles
2	2021-02-05 23:08:53.376-05	1	List.roles
3	2021-02-05 23:09:02.582-05	1	List.roles
4	2021-02-05 23:15:07.774-05	1	List.roles
5	2021-02-05 23:15:32.418-05	1	List.roles
6	2021-02-05 23:20:24.232-05	1	List.roles
7	2021-02-05 23:20:32.453-05	1	List.roles
8	2021-02-05 23:20:35.128-05	1	List.roles
9	2021-02-06 00:30:56.013-05	1	Signin.user
10	2021-02-06 00:31:05.108-05	1	Signin.user
\.


--
-- TOC entry 2039 (class 0 OID 0)
-- Dependencies: 177
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_id_seq', 10, true);


--
-- TOC entry 2021 (class 0 OID 25516)
-- Dependencies: 174
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, level) FROM stdin;
1	Admin	99
2	Consulta	10
4	Gestor	20
5	Lider	30
6	Dashboard	40
\.


--
-- TOC entry 2040 (class 0 OID 0)
-- Dependencies: 173
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 6, true);


--
-- TOC entry 2023 (class 0 OID 25526)
-- Dependencies: 176
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, rol_id, access_token, status) FROM stdin;
1	joan	$2a$10$JLyjgmjIQsvIFPk8LPcBw.pNanhllHb00SbNOUuNnx/SN1Q2lj0p6	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqb2FuIiwiaWF0IjoxNjEyNTg5NDY1LCJleHAiOjE2MTI1OTMwNjV9.vbGaX5Rd5uvhBiy8dAfRJX66-gdI5oq19a3yINeX04Y	t
\.


--
-- TOC entry 2041 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 1908 (class 2606 OID 25550)
-- Name: id; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- TOC entry 1900 (class 2606 OID 25523)
-- Name: roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- TOC entry 1902 (class 2606 OID 25521)
-- Name: roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 1904 (class 2606 OID 25535)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 1906 (class 2606 OID 25537)
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 1910 (class 2606 OID 25551)
-- Name: logs__user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs__user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 1909 (class 2606 OID 25538)
-- Name: users_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- TOC entry 2033 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 2036 (class 0 OID 0)
-- Dependencies: 174
-- Name: TABLE roles; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON TABLE public.roles FROM PUBLIC;
REVOKE ALL ON TABLE public.roles FROM postgres;
GRANT ALL ON TABLE public.roles TO postgres;
GRANT DELETE ON TABLE public.roles TO PUBLIC;


-- Completed on 2021-02-06 10:15:46

--
-- PostgreSQL database dump complete
--

