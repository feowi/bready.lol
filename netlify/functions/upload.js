// netlify/functions/upload.js
const Busboy = require('busboy');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_SUPABASE_SERVICE_ROLE_KEY';
const PASSWORD = 'your-secret-password';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  return new Promise((resolve) => {
    const busboy = Busboy({ headers: event.headers });
    let fileBuffer;
    let filename;
    let password;

    busboy.on('file', (fieldname, file, info) => {
      filename = info.filename;
      file.on('data', (data) => {
        fileBuffer = fileBuffer ? Buffer.concat([fileBuffer, data]) : data;
      });
    });

    busboy.on('field', (fieldname, val) => {
      if (fieldname === 'password') {
        password = val;
      }
    });

    busboy.on('finish', async () => {
      if (password !== PASSWORD) {
        resolve({
          statusCode: 403,
          body: JSON.stringify({ error: 'Invalid password' }),
        });
        return;
      }

      const { data, error } = await supabase.storage
        .from('images') // your Supabase storage bucket
        .upload(`uploads/${Date.now()}-${filename}`, fileBuffer, {
          contentType: 'image/png',
          upsert: false,
        });

      if (error) {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        });
      } else {
        const url = `${SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
        resolve({
          statusCode: 200,
          body: JSON.stringify({ url }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });
};
