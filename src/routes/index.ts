import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Testing } from '../controllers/test-controller';

const router = Router();

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.use(apiLimiter);

//Routes
router.get('/test', Testing);

export default router;
