import { Request, Response } from "express";
import { CreateUserDto } from "../../dtos/Dtos.dto"; // Assuming you have a DTO for job posters
import User from "../../models/userModel";

export const createJobPoster = (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  // Extract job poster data from the request body
  const jobPosterData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: 2 // Set role to 2 for job posters (semi-admin)
  };

  // Check for missing fields
  if (!jobPosterData.firstName || !jobPosterData.lastName || !jobPosterData.email || !jobPosterData.password) {
    return res.status(400).send({ status: false, message: "All fields are mandatory" });
  }

  // Check if the email is already in use
  User.findOne({ email: jobPosterData.email })
    .then(existingUser => {
      if (existingUser) {
        // User with the same email already exists
        res.status(409).send({ status: false, message: "User already exists with this email" });
      } else {
        // Save the new job poster if validation passes
        const newJobPoster = new User(jobPosterData);
        newJobPoster.save()
          .then(() => {
            res.status(201).send({ status: true, message: "Job Poster created successfully" });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({ status: false, message: "Internal Server Error" });
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ status: false, message: "Internal Server Error" });
    });
};
