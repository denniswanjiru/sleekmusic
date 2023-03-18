import makeTracksController from '@api/controllers/tracks.controller';
import validate from '@api/middlewares/validate.middleware';
import {DataSource} from '@interfaces/index';
import {AppRouter} from '@sleek-types/index';

function makeTracksRouter(router: AppRouter, dataSource: DataSource) {
  const controller = makeTracksController(dataSource);

  router.post('/tracks', validate, controller.getTrendingTrack);

  return Object.freeze({
    router,
  });
}

export default makeTracksRouter;
