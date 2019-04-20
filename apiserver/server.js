const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const helpers = require('./helpers.js');

const app = express();
const router = express.Router();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

/*
  this enables us to view a file by the id rather than by the disk path
  and prevents the disk path from being exposed to the user

  again we have to readFileSync and existsSync. would be much better with a little database.

  we'll see if there's time to refactor all of this
 */
router.get('/static/:fileId', (req, res) => {
  const file = fs.readdirSync('public').filter((file) => {
    return path.extname(file) === '.json';
  })
  // return the parsed metadata files as the response
    .map((file) => {
      return JSON.parse(fs.readFileSync('public/' + file));
    })
    .filter((metadata) => {
      return metadata.id === req.params.fileId;
    })[0];
  if (file && fs.existsSync(file.path)) {
    return res.sendFile(file.path, {
      root: __dirname,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    });
  } else {
    return res.status(404).end();
  }
});

/*
  TODO: refactor with sqlite or mongo and just add that requirement to the documentation
*/
router.delete('/removeupload/:fileId', (req, res) => {
  const normalPath = path.normalize(req.params.fileId).replace(/^(\.\.(\/|\\|$))+/, '');
  let removed = undefined;
  fs.readdirSync('public').filter((file) => {
    if (path.extname(file) === '.json') {
      return true;
    }
  }).map((file) => {
    return JSON.parse(fs.readFileSync('public/' + file));
  }).filter((file) => {
    if (file.id === normalPath) {
      return true;
    }
  }).forEach((file) => {
    file.deleted = true;
    fs.writeFileSync(`public/${ file.name }.json`, JSON.stringify(file), 'utf8');
    fs.renameSync(file.path, file.path + '.deleted');
    helpers.pprint(`Marked a file as deleted: ${ file.path }`, 'red');
    removed = file.id;
  });

  // just return the status here
  // the user doesn't need to know anything else
  if (removed) {
    return res.status(202).json({
      id: removed
    });
  }
  return res.status(500).end();
});
app.use('/', router);

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, helpers.uniqid() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    // limit the file size to 10MB
    // unfortunately multer uses bytes...
    fileSize: Math.pow(10, 7)
  },
  fileFilter: (req, file, cb) => {
    const originalExtension = path.extname(file.originalname);
    if (!['.png', '.jpg'].includes(originalExtension)) {
      return cb(new Error('File is of the wrong type.'));
    }
    return cb(null, true);
  }
}).single('data');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      helpers.pprint(err, 'red');
      return res.status(500).json(err);
    }

    /*
    In real life the following code would be a table stored somewhere.
    This approach is cumbersome and would perform poorly in production.

    But we're on a tight deadline and this needs to be easily distributed.

    Here we store meta information for each upload.
    We let JSON.stringify do the work of sanitizing user input.
     */
    const fileName = path.basename(req.file.filename, path.extname(req.file.filename));
    helpers.pprint(`File is being stored: ${ fileName }.json`, 'green');
    const meta = {
      // the id is so that we don't expose the disk filename to the response sent to the user
      id: helpers.uniqid(),
      name: fileName,
      path: req.file.path,
      size: req.file.size,
      originalname: req.file.originalname,
      deleted: false
    };
    fs.writeFile(`public/${ fileName }.json`, JSON.stringify(meta), 'utf8', () => {
    });
    return res.status(200).json(JSON.stringify({
      id: meta.id,
      size: meta.size,
      name: meta.originalname
    }));
  });
});

app.get(['/listuploads', '/listuploads/:name'], (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res
    .status(200)
    .json(
      // read the directory synchronously for metadata files
      fs.readdirSync('public').filter((file) => {
        return path.extname(file) === '.json';
      })
      // return the parsed metadata files as the response
      .map((file) => {
        return JSON.parse(fs.readFileSync('public/' + file));
      })
      // we don't delete files from the server with an API call
      // in stead we mark them deleted and don't return them here
      .filter((metadata) => {
        return !metadata.deleted;
      })
      // the requirements document explicitly states that filtering should happen via API
      // here we look for the "name" property in the body. If it exists we filter files by
      // their original name
      .filter((metadata) => {
        // if there is no "name" property in the body return everything
        if (!req.params.name) {
          return true;
          // if there is a "name" in the body return only what contains "name"
        } else {
          return metadata.originalname.includes(req.params.name);
        }
      })
      // sanitize what we return in the API response
      .map((metadata) => {
        return {
          id: metadata.id,
          size: metadata.size,
          name: metadata.originalname
        };
      })
    );
});

app.listen(8000, () => {
  helpers.pprint('Server has started on http://localhost:8000!', 'magenta');
});
