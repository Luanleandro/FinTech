import { accountRouter } from '@modules/accounts/infra/http/routes/accounts';
import { creditRequestsRouter } from '@modules/credit-requests/infra/http/routes/creditRequests';
import { transactionsRouter } from '@modules/transactions/infra/http/routes/transactions';
import { userWalletRouter } from '@modules/user-wallet/infra/http/routes/user-wallet';
import { handleError } from '@shared/infra/http/middlewares/handleError';
import { Router } from 'express';

const router = Router();

router.use('/accounts', accountRouter);
router.use('/transactions', transactionsRouter);
router.use('/credit-requests', creditRequestsRouter);
router.use('/user-wallet', userWalletRouter);
router.use(handleError);

export { router };
