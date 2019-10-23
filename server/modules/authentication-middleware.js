const rejectUnauthenticated = (req, res, next) => {
	// check if logged in
	if (req.isAuthenticated()) {
		// They were authenticated! User may do the next thing
		// Note! They may not be Authorized to do all things
		next();
	} else {
		// failure best handled on the server. do redirect here.
		res.sendStatus(403);
	}
};
// authentication of the client
const rejectIfNotClient = (req, res, next) => {
	if (req.isAuthenticated() && req.user.user_type === 'Client') {
		next();
	} else {
		res.sendStatus(403);
	}
};
// authentication of the mentor
const rejectIfNotMentor = (req, res, next) => {
	if (req.isAuthenticated() && req.user.user_type === 'Mentor') {
		next();
	} else {
		res.sendStatus(403);
	}
};
// authentication of the student
const rejectIfNotStudent = (req, res, next) => {
	if (req.isAuthenticated() && req.user.user_type === 'Student') {
		next();
	} else {
		res.sendStatus(403);
	}
};
// authentication of the admin
const rejectIfNotAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.user_type === 'Admin') {
		next();
	} else {
		res.sendStatus(403);
	}
};

module.exports = { rejectUnauthenticated, rejectIfNotClient, rejectIfNotAdmin, rejectIfNotMentor, rejectIfNotStudent };
