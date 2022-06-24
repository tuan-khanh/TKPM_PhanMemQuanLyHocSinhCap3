DO $$
DECLARE
studentID integer;
subjectID integer;
BEGIN
FOR studentID IN SELECT "ID" FROM public."HocSinh"
LOOP
FOR subjectID IN SELECT "ID" FROM public."MonHoc"
LOOP
INSERT INTO public."BangDiem"("Diem15Phut", "Diem1Tiet", "DiemCuoiKy", "HocKy", "MonHocID", "HocSinhID") VALUES (0, 0, 0, 1, subjectID, studentID);
INSERT INTO public."BangDiem"("Diem15Phut", "Diem1Tiet", "DiemCuoiKy", "HocKy", "MonHocID", "HocSinhID") VALUES (0, 0, 0, 2,  subjectID, studentID);
END LOOP;
END LOOP;
END $$;

DO $$
DECLARE
studentID integer;
subjectID integer;
BEGIN
FOR studentID IN SELECT "ID" FROM public."HocSinh" WHERE "LopID" IS NOT null
LOOP
FOR subjectID IN SELECT "ID" FROM public."MonHoc"
LOOP
UPDATE public."BangDiem" SET "Diem15Phut" = floor((random()*25+16))*0.25, "Diem1Tiet" = floor((random()*25+16))*0.25, "DiemCuoiKy" = floor((random()*25+16))*0.25
WHERE "MonHocID" = subjectID AND "HocSinhID" = studentID AND "HocKy" = 1;
UPDATE public."BangDiem" SET "Diem15Phut" = floor((random()*25+16))*0.25, "Diem1Tiet" = floor((random()*25+16))*0.25, "DiemCuoiKy" = floor((random()*25+16))*0.25
WHERE "MonHocID" = subjectID AND "HocSinhID" = studentID AND "HocKy" = 2;
END LOOP;
END LOOP;
END $$
