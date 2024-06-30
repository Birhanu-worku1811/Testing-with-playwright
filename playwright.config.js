module.exports = {
    timeout: 600000, 
    use: {
      headless: false,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 60000, 
      ignoreHTTPSErrors: true,
    },
  };
  