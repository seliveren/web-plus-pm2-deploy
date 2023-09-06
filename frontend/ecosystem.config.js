require('dotenv').config({path: './env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://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@github.com/seliveren/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -i id_ed25519  ./*.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `cd ${DEPLOY_PATH}/current/frontend && npm i && npm run build`,
    },
  },
};