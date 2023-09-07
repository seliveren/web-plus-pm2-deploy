require('dotenv').config({path: './.env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/seliveren/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
      'post-deploy': `cd ${DEPLOY_PATH}/current/backend && npm i && npm run build`,
    },
  },
};
