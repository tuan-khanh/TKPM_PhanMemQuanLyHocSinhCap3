--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-05-24 16:07:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 25439)
-- Name: BangDiem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BangDiem" (
    "ID" integer NOT NULL,
    "Diem15Phut" real,
    "Diem1Tiet" real,
    "DiemCuoiKy" real,
    "HocKy" integer NOT NULL,
    "MonHocID" integer NOT NULL,
    "HocSinhID" integer NOT NULL
);


ALTER TABLE public."BangDiem" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 25432)
-- Name: HocSinh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HocSinh" (
    "ID" integer NOT NULL,
    "MaSo" integer NOT NULL,
    "HoTen" character varying(255) NOT NULL,
    "NgaySinh" date,
    "DiaChi" character varying(255),
    "Email" character varying(50),
    "LopID" integer NOT NULL
);


ALTER TABLE public."HocSinh" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 25449)
-- Name: Lop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lop" (
    "ID" integer NOT NULL,
    "Ten" character varying(255) NOT NULL,
    "Khoi" integer NOT NULL
);


ALTER TABLE public."Lop" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 25444)
-- Name: MonHoc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MonHoc" (
    "ID" integer NOT NULL,
    "MaBM" integer NOT NULL,
    "Ten" character varying(255) NOT NULL
);


ALTER TABLE public."MonHoc" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 25454)
-- Name: QuyDinh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QuyDinh" (
    "ID" integer NOT NULL,
    "Ten" character varying(50) NOT NULL,
    "KieuDuLieu" character varying(50) NOT NULL,
    "GiaTri" character varying(255) NOT NULL
);


ALTER TABLE public."QuyDinh" OWNER TO postgres;

--
-- TOC entry 3182 (class 2606 OID 25443)
-- Name: BangDiem BangDiem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BangDiem"
    ADD CONSTRAINT "BangDiem_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3180 (class 2606 OID 25438)
-- Name: HocSinh HocSinh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HocSinh"
    ADD CONSTRAINT "HocSinh_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3186 (class 2606 OID 25453)
-- Name: Lop Lop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lop"
    ADD CONSTRAINT "Lop_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3184 (class 2606 OID 25448)
-- Name: MonHoc MonHoc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MonHoc"
    ADD CONSTRAINT "MonHoc_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3188 (class 2606 OID 25458)
-- Name: QuyDinh QuyDinh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuyDinh"
    ADD CONSTRAINT "QuyDinh_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3190 (class 2606 OID 25464)
-- Name: BangDiem HocSinhID_IDHocSinh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BangDiem"
    ADD CONSTRAINT "HocSinhID_IDHocSinh" FOREIGN KEY ("HocSinhID") REFERENCES public."HocSinh"("ID") NOT VALID;


--
-- TOC entry 3189 (class 2606 OID 25459)
-- Name: HocSinh LopID_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HocSinh"
    ADD CONSTRAINT "LopID_ID" FOREIGN KEY ("LopID") REFERENCES public."Lop"("ID") NOT VALID;


--
-- TOC entry 3191 (class 2606 OID 25469)
-- Name: BangDiem MonHocID_IDMonHoc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BangDiem"
    ADD CONSTRAINT "MonHocID_IDMonHoc" FOREIGN KEY ("MonHocID") REFERENCES public."MonHoc"("ID") NOT VALID;


-- Completed on 2022-05-24 16:07:46

--
-- PostgreSQL database dump complete
--

