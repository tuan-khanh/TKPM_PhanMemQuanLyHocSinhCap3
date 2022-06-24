-- insert classes of grade 10
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('10A1', 10);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('10A2', 10);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('10A3', 10);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('10A4', 10);

-- insert classes of grade 11
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('11A1', 11);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('11A2', 11);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('11A3', 11);

-- insert classes of grade 12
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('12A1', 12);
INSERT INTO public."Lop"("Ten", "Khoi") VALUES ('12A2', 12);

SELECT * FROM public."Lop"
ORDER BY "ID" ASC