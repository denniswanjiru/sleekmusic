import catchAsync from '@api/utils/catchAsync';
import {DataSource} from '@interfaces/index';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

function makeTracksController(dataSource: DataSource) {
  const getTrendingTrack = catchAsync(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({tracks: []});
  });

  return Object.freeze({
    getTrendingTrack,
  });
}

export default makeTracksController;
