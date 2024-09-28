import express from "express";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  companyQueryValidation,
  companyValidation,
} from "../validators/companyValidator.validation";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management endpoints
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     tags: [Company]
 *     summary: Create a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Example Company
 *               company_size:
 *                 type: string
 *                 example: Medium
 *               contact_email:
 *                 type: string
 *                 example: contact@example.com
 *               contact_phone:
 *                 type: string
 *                 example: 1234567890
 *               company_address:
 *                 type: string
 *                 example: 123 Example Street
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/companies",
  companyValidation,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array(), data: null });
    }
    next();
  },
  createCompany
);

/**
 * @swagger
 * /companies:
 *   get:
 *     tags: [Company]
 *     summary: Get a list of companies with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of companies
 *       400:
 *         description: Invalid query parameters
 */

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Get company by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60df7992fc13ae1af000006b
 *     responses:
 *       200:
 *         description: Company details
 *       404:
 *         description: Company not found
 */

router.get(
  "/companies",
  companyQueryValidation,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array(), data: null });
    }
    next();
  },
  getCompanies
);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     tags: [Company]
 *     summary: Update company details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60df7992fc13ae1af000006b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Updated Company Name
 *               company_size:
 *                 type: string
 *                 example: Large
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Company not found
 */
router.get("/companies/:id", getCompanyById);
/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     tags: [Company]
 *     summary: Update company details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60df7992fc13ae1af000006b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Updated Company Name
 *               company_size:
 *                 type: string
 *                 example: Large
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Company not found
 */
router.patch("/companies/:id", companyValidation, updateCompany);
/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags: [Company]
 *     summary: Delete a company by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60df7992fc13ae1af000006b
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
router.delete("/companies/:id", deleteCompany);

export default router;
