module.exports = function override(config, env) {
  // Add fallback for @mui/material
  config.resolve.fallback = {
    ...config.resolve.fallback,
    '@mui/material': require.resolve('@mui/material'),
    '@mui/system': require.resolve('@mui/system'),
    '@mui/material/styles': require.resolve('@mui/material/styles'),
  };

  // Add resolve extensions
  config.resolve.extensions = [...config.resolve.extensions, '.js', '.jsx', '.mjs'];

  return config;
}; 