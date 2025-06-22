const { spawn } = require('child_process');
const portfinder = require('portfinder');

// Set a base port to start searching from
portfinder.basePort = 9002;

portfinder.getPortPromise()
  .then(port => {
    console.log(`Found an open port: ${port}. Starting Next.js server...`);
    
    // We run the 'next dev' command and pass the dynamically found port.
    // 'stdio: inherit' ensures we see all the server logs.
    const child = spawn('next', ['dev', '--port', port], {
        stdio: 'inherit',
        shell: true 
    });

    child.on('close', (code) => {
        console.log(`Next.js server process exited with code ${code}`);
    });
  })
  .catch(err => {
    console.error('Error: Could not find an open port.', err);
    process.exit(1);
  });
