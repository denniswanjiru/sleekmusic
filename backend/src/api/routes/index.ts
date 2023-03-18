import passport from 'passport';

import {DataSource} from '@interfaces/index';
import {AppRouter} from '@sleek-types/index';
import makeAuthRouter from '@api/routes/auth.routes';
import makeTracksRouter from '@api/routes/tracks.routes';
// import isAutheticated from '@api/middlewares/isAuthenticated.middleware';

// interface IRoute {
//     path: string
//     isPrivate: boolean
//     router: AppRouter
// }

function routes(router: AppRouter, dataSource: DataSource) {
  const authRouter = makeAuthRouter(router, dataSource);
  const tracksRouter = makeTracksRouter(router, dataSource);

  // const defaultRoutes: IRoute[] = [
  //   {
  //     path: '/auth',
  //     isPrivate: false,
  //     router: authRouter.router,
  //   },
  //   {
  //     path: '/tracks',
  //     isPrivate: true,
  //     router: tracksRouter.router,
  //   },
  // ];

  // TODO [devRoutes]: routes available on dev mode only eg docs

  // defaultRoutes.forEach((route) => {
  //   router.use(
  //       // isAutheticated(route.isPrivate),
  //       route.router);
  // });

  router.use('/auth', authRouter.router);
  router.use(
      '/tracks',
      passport.authenticate('jwt', {session: false}),
      tracksRouter.router,
  );

  // TODO: check node_env mode if dev use devRoutes

  // DataSourceInterface
  return router;
}

export default routes;
