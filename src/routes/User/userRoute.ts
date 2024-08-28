import { Router } from "express";
import { signUp } from "../../controllers/SignUp/signUp";
import { createJobPoster } from "../../controllers/SignUp/postersSignUp";
import { signIn } from "../../controllers/SignIn/signIn";
import { forgetPassword } from "../../controllers/PasswordReset/forgotPassword";
import { verifyOtp } from "../../controllers/PasswordReset/verifyOtp";
import { resetPassword } from "../../controllers/PasswordReset/resetPassword";
import {createCompany } from '../../controllers/Company/AddCompany';

import multer from 'multer';
import { getCompanyByUserId } from "../../controllers/Company/getCompany";
import { verifyToken } from "../../middlewares/verifyToken";
import { getAllCompanies } from "../../controllers/Company/getAllCompanies";
import { deleteCompany } from "../../controllers/Company/deleteCompany";
import { updateCompany } from "../../controllers/Company/updateCompany";
import { getCompanyById } from "../../controllers/Company/getCompanywithId";
import { createJob } from "../../controllers/Jobs/createJob";
import { getJobsByUserId } from "../../controllers/Jobs/getJobUserId";
import { deleteJob } from "../../controllers/Jobs/deleteJob";
import { getJobById } from "../../controllers/Jobs/getJobId";
import { updateJob } from "../../controllers/Jobs/updateJob";
import { changePassword } from "../../controllers/PasswordReset/passwordChange"
import { fetchJob } from "../../controllers/Jobs/fetchJob";
import { getCompaniesWithJobCount } from "../../controllers/Company/companyCount";
import { getProfile, updateProfile } from "../../controllers/Skillers/Skillers";
import { getAllJobs } from "../../controllers/Jobs/fetchAllJobs";
import { getJobByIdOf } from "../../controllers/Jobs/JobsById";
import { getAllCompaniesWithJobs } from "../../controllers/Company/AllCompanies";
import { getAllUsersWithProfiles, getUserProfileById } from "../../controllers/Skillers/UserProfile";
import { JobApplication } from "../../controllers/Application/Job";
import { SkillersApplications } from "../../controllers/Application/Skillers";
import { getJobDetails } from "../../controllers/Application/JobDetails";
import { deleteApplication, Employer, updateApplicationStatus } from "../../controllers/Application/Employer";
import { sendAcceptanceEmail, sendRejectionEmail } from "../../controllers/Application/Nodemailer";

const router = Router();

// Authentication Routes
// Sign Up
// /api/users/signup
router.post('/signup', signUp)

// /api/users/jobpost
router.post('/jobpost', createJobPoster)

// Sign In
// /api/users/signin
router.post('/signin', signIn)

// Password Reset
// /api/users/forgot-password
router.post('/forgot-password', forgetPassword);

// /api/users/change-password
router.post('/change-password', changePassword);

// /api/users/verify-otp
router.post('/verify-otp', verifyOtp);

// /api/users/reset-password
router.post('/reset-password', resetPassword);

// const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage, should be cleaned up after upload

// /api/users/addcompany
router.post('/addcompany', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'pictures', maxCount: 10 }
]), createCompany);

// /api/users/getcompany/:userId
router.get('/getcompany/:userId',verifyToken , getCompanyByUserId); 

// /api/users/getjob/:userId
router.get('/getjob/:userId',verifyToken , getJobsByUserId); 

// /api/users/getcompanyid/:companyId
router.get('/getcompanyid/:companyId', getCompanyById);

// /api/users/getjobId/:jobId
router.get('/getjobId/:jobId',verifyToken, getJobById);

// /api/users/allcompanies
router.get('/allcompanies', getAllCompanies);

// /api/users/delete/companies/:id
router.delete('/delete/companies/:id', deleteCompany);

// /api/users/delete/job/:id
router.delete('/delete/job/:id', deleteJob);

// /api/users/update/companies/:id
router.patch('/update/companies/:id', updateCompany);

// /api/users/allcompany/companies
router.get('/allcompany/companies', getAllCompaniesWithJobs);

// /api/users/update/jobs/:id
router.patch('/update/jobs/:id', updateJob);

// /api/users/jobs/:jobId
router.get('/jobs/:id', fetchJob);

// /api/users/post/jobs
router.post('/post/jobs', createJob);

// /api/users/with-job-count
router.get('/with-job-count/:id', getCompaniesWithJobCount);

// /api/users/:userId
router.get('/:userId', getProfile);

// /api/users/alljobs/jobs
router.get('/alljobs/jobs', getAllJobs);

// /api/users/jobsbyid/jobsId
router.get('/jobsbyid/:id', getJobByIdOf);

// /api/users/profilecards/allusers
router.get('/profilecards/allusers', getAllUsersWithProfiles)

// /api/users/profilecard/allusers/:userId
router.get('/profilecard/allusers/:userId', getUserProfileById)

// /api/users/:userId
router.post('/:userId', updateProfile);

// Job Application

// /api/users/application/jobs
router.post('/application/jobs', JobApplication);

// /api/users/applications/user/:userId
router.get('/applications/user/:userId', SkillersApplications);

// /api/users/applications/jobs/:jobId
router.get('/applications/jobs/:jobId', getJobDetails);

// /api/users/employer/jobs/:userId'
router.get('/employer/jobs/:userId', Employer);

// /api/users/employer/update-status
router.post('/employer/update-status', updateApplicationStatus);

// /api/users/employer/delete-application/:applicationId
router.delete('/employer/delete-application/:applicationId', deleteApplication);

// /api/users/employer/email/accept'
router.post('/employer/email/accept', sendAcceptanceEmail);

// /api/users/employer/email/reject'
router.post('/employer/email/reject', sendRejectionEmail);

export default router;