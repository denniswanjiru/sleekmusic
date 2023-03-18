import {createLogger, format, transports} from 'winston';

import config from './config';

const alignColorsAndTime = format.combine(
    format.colorize({
      all: true,
    }),
    format.label({
      label: '[LOGGER]',
    }),
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.printf(
        (info) =>
          `${info.label} ${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

const logger = createLogger({
  level: config.env == 'dev' ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
          format((info) => {
            info.level = info.level.toUpperCase();
            return info;
          })(),
          format.colorize(),
          alignColorsAndTime,
      ),
    }),
  ],
});

export default logger;
