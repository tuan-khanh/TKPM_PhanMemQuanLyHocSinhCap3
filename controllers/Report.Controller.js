const { getSubjectReport } = require('../models/Report.Model');
const ReportModel = require('../models/Report.Model');
const SubjectModel = require('../models/Subject.Model');


exports.subject = async (req, res, next) => {
    if(Object.keys(req.query).length != 0) {
        const report = await ReportModel.getSubjectReport(req.query.subject, req.query.term);
        return res.render("reports/subject_report", {
            layout: "general",
            flag: Object.keys(req.query).length == 0,
            report,
            subject: (await SubjectModel.selectOneSubjectByID(req.query.subject)).Ten,
            term: req.query.term,
        });
    }
    return res.render("reports/subject_report", {
        layout: "general",
        flag: Object.keys(req.query).length == 0,
    });
};

exports.term = async (req, res, next) => {
    if(Object.keys(req.query).length != 0) {
        const report = await ReportModel.getTermReport(req.query.term);
        return res.render("reports/term_report", {
            layout: "general",
            flag: Object.keys(req.query).length == 0,
            report,
            term: req.query.term,
        });
    }

    return res.render("reports/term_report", {
        layout: "general",
        flag: Object.keys(req.query).length == 0,
    });
};