async function recordDurationStatistics(gameName, duration_mins){
  const ACCESS_TOKEN = localStorage.getItem("JWT");
  const result = await fetch('/api/gamePlayedDuration', {
    method: 'POST',
    headers: {
      'Authorization': 'ACCESS_TOKEN '+ ACCESS_TOKEN,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      gameName, duration_mins
    })
  }).then(res => res.json());

  if(result.status == 'error' && result.tokenExpired){
    const REFRESH_TOKEN = localStorage.getItem("RefreshToken");
    const newAccessToken = await fetch('/token', {
      method: 'POST',
      headers: {
        'Authorization': 'REFRESH_TOKEN '+ REFRESH_TOKEN,
        'Content-type': 'application/json'
      }
    }).then(res => res.json());
    if(localStorage.getItem("JWT")){
      localStorage.removeItem("JWT");
    }
    localStorage.setItem("JWT", newAccessToken);
    recordDurationStatistics(gameName, duration_mins);
  }
}

async function userLogout(){
  const REFRESH_TOKEN = localStorage.getItem("RefreshToken");
  const response = await fetch('/api/logout', {
    method: 'DELETE',
    headers: {
      'Authorization': 'REFRESH_TOKEN '+ REFRESH_TOKEN,
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
  .then(() => {
    if(localStorage.getItem("JWT")){
      localStorage.removeItem("JWT");
      localStorage.removeItem("RefreshToken");
    }
  })
  .then(() => {
    window.location.href = "http://localhost:4000/login";
  });
}

async function getProfile(){
  const ACCESS_TOKEN = localStorage.getItem("JWT");
  const ign = JSON.parse(window.atob(ACCESS_TOKEN.split('.')[1])).ign;
  // const ign = obj.ign;
  console.log(ign);
  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: {
      'Authorization': 'ACCESS_TOKEN '+ ACCESS_TOKEN,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      ign
    })
  })
  .catch(err => console.log(err))
  .then(res => res.json())
  .then((res) => {
    console.log(res.user);
    showProfile(res.user);
  });
}