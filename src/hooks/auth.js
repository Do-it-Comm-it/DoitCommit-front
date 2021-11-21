router.post('/auth', async (req, res) => {
  const { code } = req.body;

  const response = await axios.post(
    'https://github.com/login/auth/access_token',
    {
      code,
      client_id,
      client_secret,
    },
    {
      headers: {
        accept: 'application/json',
      },
    },
  );

  const token = response.data.access_token;

  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const access_token = await jwt.generate({ 
    login: data.login, 
    id: data.id 
  });

  return res.json({ 
    access_token
  });
});