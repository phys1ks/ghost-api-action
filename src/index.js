const core = require("@actions/core");
const GhostAdminAPI = require('@tryghost/admin-api');
var md = require('markdown-it')();

core.debug('Configuring Ghost API Client')

// Configure the client
const api = new GhostAdminAPI({
  url: core.getInput('url', { required: true}),
  key: core.getInput('key', { required: true }),
  version: core.getInput('version', { required: true })
});

const repo = process.env.GITHUB_WORKSPACE;

// Make the call!
api.pages.read({
  id: core.getInput('page', { required: true})
})
  .then((pages) => {
    fs = require('fs')
    fs.readFile(`${repo}` + core.getInput('readme', { required: true }), 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      const updatedat = pages["updated_at"];
      const contentMD = data.toString();
      const contentHTML = md.render(contentMD).toString();

      core.debug(contentHTML);
      api.pages
        .edit(
          {
            id: core.getInput('page', { required: true}),
            title: 'Proxintosh Updated',
            updated_at: updatedat,
            html: contentHTML
          },
          { source: 'html' }
        )
        .then(res => console.log(JSON.stringify(res)))
        .catch(err => console.log(err));
    })
      .catch((err) => {
        console.error(err);
      });
  });